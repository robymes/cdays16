mkdir node_remove
robocopy node_remove node_modules /s /mir
rmdir node_remove
rmdir node_modules
mkdir bower_remove
robocopy bower_remove bower_components /s /mir
rmdir bower_remove
rmdir bower_components
mkdir chrome_remove
robocopy chrome_remove .vscode/chrome /s /mir
rmdir chrome_remove
rmdir .vscode/chrome