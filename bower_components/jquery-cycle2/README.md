# Cycle2 - 2nd Generation Cycling!

## Getting Started
Download either the [production version][min] or the [development version][max] of Cycle2.

[min]: http://malsup.github.com/min/jquery.cycle2.min.js
[max]: http://malsup.github.com/jquery.cycle2.js

In your web page:

<pre>
&lt;!-- include jQuery -->
&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js">&lt;/script>
&lt;!-- include Cycle2 -->
&lt;script src="http://path/to/your/copy/of/jquery.cycle2.min.js">&lt;/script>

...

&lt;!-- declare a slideshow -->
&lt;div class="<strong>cycle-slideshow</strong>">
    &lt;img src="http://malsup.github.com/images/p1.jpg">
    &lt;img src="http://malsup.github.com/images/p2.jpg">
    &lt;img src="http://malsup.github.com/images/p3.jpg">
&lt;/div>
</pre>
That's it!  You don't need to write any script to initialize the slideshow, Cycle2 will auto-initialize if you use the class <code>cycle-slideshow</code>.

## Documentation, Demos, Downloads and FAQ
Everything you need to know can be found here: 
[http://jquery.malsup.com/cycle2/](http://jquery.malsup.com/cycle2/)

## Bower
To install Cycle2 via Bower:
<pre>bower install jquery-cycle2</pre>
The only file you will need (unless you're customizing) is <code>build/jquery.cycle2.min.js</code>

(Other files are available for advanced customization and you can read more about them on the [download]
and [advanced download][advanced] pages.)

[download]: http://jquery.malsup.com/cycle2/download/
[advanced]: http://jquery.malsup.com/cycle2/download/advanced.php


## Build
If you want to make changes to Cycle2 and build it yourself, you can do so by installing the node build dependencies:
<pre>npm install</pre>
and then running grunt
<pre>grunt</pre>

## Copyright and License
Copyright &copy; 2012-2014 M. Alsup.

The Cycle2 plugin is dual licensed under the [MIT](http://malsup.github.com/mit-license.txt) and [GPL](http://malsup.github.com/gpl-license-v2.txt) licenses.

You may use either license.  The MIT license is recommended for most projects because it is simple and easy to understand and it places almost no restrictions on what you can do with the plugin.

If the GPL suits your project better you are also free to use the plugin under that license.

You do not have to do anything special to choose one license or the other and you don't have to notify anyone which license you are using. You are free to use the Cycle2 plugin in commercial projects as long as the copyright header is left intact.
