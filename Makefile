test:
	(sleep 2; open http://127.0.0.1:5000/dev_test.html) &
	cd src && python -m SimpleHTTPServer 5000

build:
	python build.py

