TESTS = test/*.js test/**/*.js test/**/**/*.js

test:
	@NODE_ENV=test NODE_PATH=./config:./app/controllers ./node_modules/.bin/ava $(TESTS)

.PHONY: test
