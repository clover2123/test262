# test262 for es2015
This branch represents test262 version for es2015 standard.
(basically there is no es2015 branch)

NOTE: 
Some tests are wrong or represent complicated features which other major engines also fail.
These tests are separately written in `tools/test262/excludelist.orig.xml`

## Run test262
Run all the test262 suite except some tests which are listed in `tools/test262/excludelist.orig.xml`
```sh
tools/run-tests.py --engine="js_engine_binary_path"
```

## Update exclude list
Script `make_excludelist.py` runs the test262 suite with empty exclude list and then re-generate the exclude list based on the failed result.

```sh
tools/test262/make_excludelist.py --engine="js_engine_binary_path"
```

