var testsContext = require.context('./src/js', true, /-test\.js$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src/js', true, /^((?!__tests__).)*.js$/);
srcContext.keys().forEach(srcContext);
