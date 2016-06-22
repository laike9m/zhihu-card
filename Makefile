build:
	python build.py
	yes | cp src/card.js jsdelivr
	yes | cp src/widget.js jsdelivr