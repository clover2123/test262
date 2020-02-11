#!/usr/bin/env python

from __future__ import print_function

import os
import traceback
import sys

from argparse import ArgumentParser
from difflib import unified_diff
from glob import glob
from os.path import abspath, basename, dirname, join, relpath
from shutil import copy
from subprocess import PIPE, Popen


PROJECT_SOURCE_DIR = dirname(dirname(abspath(__file__)))
DEFAULT_ENGINE = join(PROJECT_SOURCE_DIR, 'jerry')


COLOR_RED = '\033[31m'
COLOR_GREEN = '\033[32m'
COLOR_YELLOW = '\033[33m'
COLOR_BLUE = '\033[34m'
COLOR_PURPLE = '\033[35m'
COLOR_RESET = '\033[0m'


RUNNERS = {}
DEFAULT_RUNNERS = []


class runner(object):

    def __init__(self, suite, default=False):
        self.suite = suite
        self.default = default

    def __call__(self, fn):
        RUNNERS[self.suite] = fn
        if self.default:
            DEFAULT_RUNNERS.append(self.suite)
        return fn


def run(args, cwd=None, env=None, stdout=None, checkresult=True, report=False):
    if cwd:
        print(COLOR_BLUE + 'cd ' + cwd + ' && \\' + COLOR_RESET)
    if env:
        for var, val in sorted(env.items()):
            print(COLOR_BLUE + var + '=' + val + ' \\' + COLOR_RESET)
    print(COLOR_BLUE + ' '.join(args) + COLOR_RESET)

    if env is not None:
        full_env = dict(os.environ)
        full_env.update(env)
        env = full_env

    proc = Popen(args, cwd=cwd, env=env, stdout=PIPE if report else stdout)

    counter = 0

    while report:
        nextline = proc.stdout.readline()
        if nextline == '' and proc.poll() is not None:
            break
        stdout.write(nextline)
        stdout.flush()
        if counter % 250 == 0:
            print('Ran %d tests..' % (counter))
        counter += 1

    out, _ = proc.communicate()

    if out:
        print(out)

    if checkresult and proc.returncode:
        raise Exception('command `%s` exited with %s' % (' '.join(args), proc.returncode))
    return out

@runner('test262', default=True)
def run_test262(engine):
    TEST262_OVERRIDE_DIR = join(PROJECT_SOURCE_DIR, 'tools', 'test262')
    TEST262_DIR = join(PROJECT_SOURCE_DIR, 'test262')

    copy(join(TEST262_OVERRIDE_DIR, 'excludelist.orig.xml'), join(TEST262_DIR, 'excludelist.xml'))
#copy(join(TEST262_OVERRIDE_DIR, 'cth.js'), join(TEST262_DIR, 'harness', 'cth.js'))
#copy(join(TEST262_OVERRIDE_DIR, 'monkeyYaml.py'), join(TEST262_DIR, 'tools', 'packaging', 'monkeyYaml.py'))
#copy(join(TEST262_OVERRIDE_DIR, 'parseTestRecord.py'), join(TEST262_DIR, 'tools', 'packaging', 'parseTestRecord.py'))
    copy(join(TEST262_OVERRIDE_DIR, 'test262.py'), join(TEST262_DIR, 'tools', 'packaging', 'test262.py')) # for parallel running (we should re-implement this for es6 suite)

    stdout = run(['pypy', join('tools', 'packaging', 'test262.py'),
         '--command', engine,
         '--full-summary'],
        cwd=TEST262_DIR,
        env={'TZ': 'US/Pacific'},
        stdout=PIPE)

    summary = stdout.split('=== Test262 Summary ===')[1]
    if summary.find('- All tests succeeded') < 0:
        raise Exception('test262 failed')
    print('test262: All tests passed')

def main():
    parser = ArgumentParser(description='Test Suite Runner')
    parser.add_argument('--engine', metavar='PATH', default=DEFAULT_ENGINE,
                        help='path to the engine to be tested (default: %(default)s)')
    args = parser.parse_args()

    print(COLOR_PURPLE + 'running test suite: test262' + COLOR_RESET)
    try:
        RUNNERS['test262'](args.engine)
    except Exception as e:
        print('\n'.join(COLOR_YELLOW + line + COLOR_RESET for line in traceback.format_exc().splitlines()))
        sys.exit(COLOR_RED + sys.argv[0] + ': test262 fail' + COLOR_RESET)

    print(COLOR_GREEN + sys.argv[0] + ': test262 success' + COLOR_RESET)
    sys.exit()


if __name__ == '__main__':
    main()
