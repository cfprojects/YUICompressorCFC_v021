project: YUICompressor CFC
author: Tom de Manincor
version: 0.2.1
date: 3/02/2010

-overview-
This CFC allows you to use the YUI Compressor Java library.

"The YUI Compressor is a JavaScript compressor which, in addition to removing
comments and white-spaces, obfuscates local variables using the smallest
possible variable name. This obfuscation is safe, even when using constructs
such as 'eval' or 'with' (although the compression is not optimal is those
cases) Compared to jsmin, the average savings is around 20%.
The YUI Compressor is also able to safely compress CSS files. The decision
on which compressor is being used is made on the file extension (js or css)"

This CFC adds some more flexibility. It accepts an input string or a file, as long as its valid JS or CSS.
You can also choose to return the compressed results back as a string or a file.

It is using the YUI components for both CSS and JS.
For more information on the YUI library visit:
http://developer.yahoo.com/yui/compressor/

-requirements-
ColdFusion 7 or Higher
JavaLoader (version 1.0 included)
YUI Compressor Java Library (version 2.4.2 included)

-usage-
JavaLoader is included with the package, but you can pass in a reference to an existing instance of JavaLoader, as well.
See example code from the index.cfm.

-note-
Do not use the additional libraries that are bundled with the base jar. String Index out of range errors may occur.

-credits-
Joe Roberts

0.2.1 -CHANGE LOG- 3/2/2010
-removed CF class path version (looking into work around for org.mozzilla ErrorReporter interface class)

0.2 -CHANGE LOG- 2/18/2010
-removed ClassLoaderAdapter

0.1 -INITIAL RELEASE- 2/18/2010
-JS and CSS compression supported
-auto detect input type
-allow input files or string
-output to file or string