# simple-web-app
A really simple web application, generated with nodejs

#front -> reach the /front folder
	-Install : run "npm i" command
	-Launch : run "npm start" command (see package.json)
  #Carefull, the default command is nodemon instead of node. This way, your app is automatically relaoded on save
	-Add any css file: add it in /public/css folder
	-Add any script : add it in /public/js folder
	-Add any sub-component : 
		add the view in /views/components folder
		name the balise in the parent this way : <app-example></app-example> 
		it should be automaticaly integrated
