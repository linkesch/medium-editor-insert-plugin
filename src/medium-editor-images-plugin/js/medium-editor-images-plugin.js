(function ($) {
 
  $.fn.mediumImages = function( options ) {
 
    var settings = $.extend({
      'uploadScript': 'upload.php'
    }, options );
    
    var setImagePlaceholders = function (that) {
    
      that.keyup(function () {        
        var i = 0;
        
        $('p', that).each(function () {
          if ($(this).next().hasClass('mediumImages-addImage') === false) {
            $(this).after('<div class="mediumImages-addImage" id="mediumImages-addImage-'+ i +'" contenteditable="false">'+
              '<div class="mediumImages-imageUploadInfo"><a>Add image</a> &nbsp;&rarr;</div>'+
              '<div class="mediumImages-placeholder"></div>'+
              '</div>');                 
          } 
          i++;
        });
      }).keyup(); 
      
      $(document).on('click', '.mediumImages-imageUploadInfo a', function () {
        var placeholder = $(this).parent().siblings('.mediumImages-placeholder');
        var selectFile = $('<input type="file">').click();
        selectFile.change(function () {
          var files = this.files;
          uploadFiles(placeholder, files); 
        });
      });
      
      $(document).on('mouseenter', '.mediumImages-image', function () { 
        var img = $('img', this);
        if (img.length > 0) {
          $(this).append('<a class="mediumImages-remove"></a>');
          
          if ($(this).parent().parent().hasClass('small')) {
            $(this).append('<a class="mediumImages-resize-bigger"></a>');
          } else {
            $(this).append('<a class="mediumImages-resize-smaller"></a>');
          }
          
          var positionTop = img.position().top + parseInt(img.css('margin-top'), 10);
          var positionLeft = img.position().left + img.width() -30;
          $('.mediumImages-remove', this).css({
            'right': 'auto',
            'top': positionTop,
            'left': positionLeft
          });
          $('.mediumImages-resize-bigger, .mediumImages-resize-smaller', this).css({
            'right': 'auto',
            'top': positionTop,
            'left': positionLeft-31
          });  
        }
      });
      
      $(document).on('mouseleave', '.mediumImages-image', function () { 
        $('.mediumImages-remove, .mediumImages-resize-smaller, .mediumImages-resize-bigger', this).remove();
      });
      
      $(document).on('click', '.mediumImages-resize-smaller', function () {
        $(this).parent().parent().parent().addClass('small');
        $(this).parent().mouseleave().mouseleave();
      });
      
      $(document).on('click', '.mediumImages-resize-bigger', function () {
        $(this).parent().parent().parent().removeClass('small');
        $(this).parent().mouseleave().mouseleave();
      });
      
      $(document).on('click', '.mediumImages-remove', function () {
        if ($(this).parent().siblings().length === 0) {
          $(this).parent().parent().parent().removeClass('small');
        }
        $(this).parent().remove();
      });
    };

    var dragAndDropFiles = function () {
      var dropSuccessful = false;
      var dropSort = false;
      var dropSortIndex, dropSortParent;
    
      $(document).on('dragover', 'body', function () {
        $(this).addClass('hover');
      });
      
      $(document).on('dragend', 'body', function () {
        $(this).removeClass('hover');
      });
    
      $(document).on('dragover', '.mediumImages-addImage', function () {
        $(this).addClass('hover');  
        $(this).attr('contenteditable', true);
      });
      
      $(document).on('dragleave', '.mediumImages-addImage', function () {
        $(this).removeClass('hover');  
        $(this).attr('contenteditable', false);
      });
      
      $(document).on('dragstart', '.mediumImages-addImage img', function (e) {
        dropSortIndex = $(this).parent().index();
        dropSortParent = $(this).parent().parent().parent().attr('id');
      });
      
      $(document).on('dragend', '.mediumImages-addImage img', function (e) {
        if (dropSuccessful === true) {
          if ($(e.originalEvent.target.parentNode).siblings().length === 0) {
            $(e.originalEvent.target.parentNode).parent().parent().removeClass('small'); 
          }
          $(e.originalEvent.target.parentNode).mouseleave();
          $(e.originalEvent.target.parentNode).remove();  
          dropSuccessful = false;
          dropSort = false;
        }
      });
      
      $(document).on('dragover', '.mediumImages-addImage img', function (e) {
        e.preventDefault();
      });
      
      $(document).on('drop', '.mediumImages-addImage img', function (e) {
        if (dropSortParent !== $(this).parent().parent().parent().attr('id')) {
          dropSort = false;  
          dropSortIndex = dropSortParent = null;
          return;
        }
      
        var index = parseInt(dropSortIndex, 10);

        // Sort
        var dragged = $(this).parent().parent().find('.mediumImages-image:nth-child('+ (index+1) +')');
        var finalIndex = $(this).parent().index();
        if(index < finalIndex) {
          dragged.insertAfter($(this).parent());
        } else if(index > finalIndex) {
          dragged.insertBefore($(this).parent());
        }
        
        dragged.mouseleave();

        dropSort = true;
        dropSortIndex = null;
      });

      $(document).on('drop', '.mediumImages-addImage', function (e) {
        e.preventDefault();
        $(this).removeClass('hover');
        $('body').removeClass('hover');
        $(this).attr('contenteditable', false);  

        var files = e.originalEvent.dataTransfer.files;   
        if (files.length > 0) {
          // File upload
          uploadFiles($('.mediumImages-placeholder', this), files);   
        } else if (dropSort === true) {
          dropSort = false;
        } else {
          // Image move from block to block
          $('.mediumImages-placeholder', this).append('<span class="mediumImages-image">'+ e.originalEvent.dataTransfer.getData('text/html') +'</span>'); 
          dropSuccessful = true;
        }
      });
      
    };
 
    var uploadFiles = function (placeholder, files) {
      var acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      };
        
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        
        if (acceptedTypes[file.type] === true) {
        
          var formData = new FormData();
          formData.append('file', file);
        
          var xhr = new XMLHttpRequest();
          xhr.open('POST', settings.uploadScript);
          xhr.onload = function () {
            if (xhr.status === 200) {
              console.log('all done: ' + xhr.status);
            } else {
              console.log('Something went terribly wrong...');
            }
          };
          
          xhr.send(formData);
          
          placeholder.append('<progress class="progress" min="0" max="100" value="0">0</progress>');
          var progress = $('.progress:last');
          
          xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
              var complete = (event.loaded / event.total * 100 | 0);
              progress.attr('value', complete);
              progress.html(complete);
            }
          };
          
          xhr.onload = function (e) {
            progress.attr('value', 100);
            progress.html(100);
            
            $('.progress:first').before('<span class="mediumImages-image"><img src="'+ e.currentTarget.response +'" draggable="true"></span>');
            var img = $('.progress:first').siblings('img');
            $('.progress:first').remove();
              
            img.load(function () {
              img.parent().mouseleave().mouseenter();
            });
          };
          
        }
      }
    };
 
    return this.each(function () {
    
      $('p', this).bind('dragover drop', function (e) {
        e.preventDefault();
        return false;
      });
    
      setImagePlaceholders($(this));
      
      dragAndDropFiles();
       
    });
 
  };
 
}(jQuery));