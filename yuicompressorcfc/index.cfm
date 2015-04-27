<cfset oYUICompressor = createObject("component", "YUICompressor").init(javaLoader = 'javaloader.JavaLoader', libPath = expandPath('./lib')) />

<h1>YUI Compressor CFC</h1>
<cfdump var="#oYUICompressor#" expand="false" label="YUI Compressor CFC">

<cfif structKeyExists(oYUICompressor,'getEnableJavaLoader') and oYUICompressor.getEnableJavaLoader()>
	<h1>Java Loader Version</h1>
	<cfdump var="#oYUICompressor.getJavaLoaderVersion()#">
</cfif>

<h1>CSS - Input File, Output File</h1>
<cfset compressedCSS = oYUICompressor.compress(
											inputFilePath = expandPath('examples/demo.css')
											,outputFilePath = expandPath('examples/demo-compressed.css')
											) />
<cfdump var="#compressedCSS#" expand="false" label="Compressed CSS">

<h1>JS - Input File, Output File</h1>
<cfset compressedJS = oYUICompressor.compress(
											inputFilePath = expandPath('examples/demo.js')
											,outputFilePath = expandPath('examples/demo-compressed.js')
											) />

<cfdump var="#compressedJS#" expand="false" label="Compressed JS">


<cffile action="read" file="#expandPath('examples/demo.css')#" variable="inputString" />
<h1>CSS - Input String, Output String</h1>
<cfset compressedCSS = oYUICompressor.compress(
											inputType = 'css'
											,inputString = inputString
											) />
<cfdump var="#compressedCSS#" expand="false" label="Compressed CSS">

<cffile action="read" file="#expandPath('examples/demo-compressed.js')#" variable="inputString" />
<h1>JS - Input String, Output String</h1>
<cfset compressedJS = oYUICompressor.compress(
											inputType = 'js'
											,inputString = inputString
											) />
<cfdump var="#compressedJS#" expand="false" label="Compressed JS">

<cffile action="read" file="#expandPath('examples/demo.css')#" variable="inputString" />
<h1>CSS - Input String, Output File</h1>
<cfset compressedCSS = oYUICompressor.compress(
											inputType = 'css'
											,inputString = inputString
											,outputFilePath = expandPath('examples/demo-compressed.css')
											) />
<cfdump var="#compressedCSS#" expand="false" label="Compressed CSS">

<cffile action="read" file="#expandPath('examples/demo-compressed.js')#" variable="inputString" />
<h1>JS - Input String, Output File</h1>
<cfset compressedJS = oYUICompressor.compress(
											inputType = 'js'
											,inputString = inputString
											,outputFilePath = expandPath('examples/demo-compressed.js')
											) />
<cfdump var="#compressedJS#" expand="false" label="Compressed JS">