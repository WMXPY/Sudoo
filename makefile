# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
ifeq ($(OS), Windows_NT)
	tsc := .\node_modules\.bin\tsc
	mocha := .\node_modules\.bin\mocha
else
	tsc := node_modules/.bin/tsc
	mocha := node_modules/.bin/mocha
endif

sudoo: dev

dev:
	@echo "[INFO] Building for development"
	@$(tsc) --p $(dev)

install:
	@echo "[INFO] Installing Dependences"
	@npm install
	@npm install --only=dev

clean:
ifeq ($(OS), Windows_NT)
	@echo "[INFO] Skipping"
else
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf dist_script
	@rm -rf .nyc_output
	@rm -rf coverage
endif
