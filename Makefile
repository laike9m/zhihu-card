.PHONY: all prodtest build clean

build:
	python3 build.py
	python3 build.py prodtest

# Test after pushing latest changes.
prodtest:
	(sleep 2; open http://127.0.0.1:5000/prod_test.html) &
	cd src && python3 -m http.server 5000
