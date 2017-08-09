.PHONY: all prodtest build raw_build clean

raw_build:
	python3 build.py
	python3 build.py prodtest

build:
	python3 build.py
	python3 build.py prodtest
	git add --all
	git commit -am "build latest change"
	git push

prodtest:
	(sleep 2; open http://127.0.0.1:5000/prod_test.html) &
	cd src && python3 -m http.server 5000

publish:
	python3 publish.py
