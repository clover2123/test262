#!/usr/bin/env python

from __future__ import print_function

import os
import traceback
import sys
import subprocess

from argparse import ArgumentParser
from os.path import abspath, dirname, join, isfile
from shutil import copy
from subprocess import PIPE, Popen


PROJECT_SOURCE_DIR = dirname(dirname(dirname(abspath(__file__))))
SCRIPT_SOURCE_DIR = dirname(abspath(__file__))
DEFAULT_ENGINE = join(PROJECT_SOURCE_DIR, 'jerry')

COLOR_RED = '\033[31m'
COLOR_GREEN = '\033[32m'
COLOR_RESET = '\033[0m'

def run_all_test262(engine):
    template_file = open(join(SCRIPT_SOURCE_DIR, 'template.xml'), 'r')
    empty_list = template_file.read()
    template_file.close()

    exclude_file = open(join(SCRIPT_SOURCE_DIR, 'excludelist.orig.xml'), 'w')
    exclude_file.write(empty_list)
    exclude_file.write(rear_template())
    exclude_file.close()

    proc = Popen(['pypy', join(PROJECT_SOURCE_DIR, 'tools', 'run-tests.py'), '--engine', engine],
        stdout=PIPE, stderr=PIPE)
    out, _ = proc.communicate()

    if not out:
        raise Exception('test262 run with empty exclude list returns no result')

    return out

def front_template():
    template_file = open(join(SCRIPT_SOURCE_DIR, 'template.xml'), 'r')
    template = template_file.read()
    template_file.close()
    return template

def rear_template():
    return '</excludeList>'

def main():
    parser = ArgumentParser()
    parser.add_argument('--engine', metavar='PATH', default=DEFAULT_ENGINE,
                        help='path to the engine to be tested (default: %(default)s)')
    args = parser.parse_args()

    full = run_all_test262(args.engine)
    if full.find('- All tests succeeded') >= 0:
        sys.exit(COLOR_RED + 'already passed all test262 tcs' + COLOR_RESET)

    with open(join(SCRIPT_SOURCE_DIR, 'excludelist.orig.xml'), 'w') as out_file:
        summary = full.split('=== Test262 Summary ===')[1]

        out_list = []
        if summary.find('Test262 Failed Tests') > 0:
            failed = summary.split('Test262 Failed Tests')[1]
            failed = failed.split('Failed Tests End')[0]
            failed = failed.replace(' in strict mode', '')
            failed = failed.replace(' in non-strict mode', '')
            failed = failed.split()
            failed = sorted(set(failed))

            for item in failed:
                list_item = '    <test id="' + item + '"><reason>TODO</reason></test>\n';
                out_list.append(list_item)

        if summary.find('Test262 Expected to fail but passed') > 0:
            failed = summary.split('Test262 Expected to fail but passed')[1]
            failed = failed.split('Expected to fail End')[0]
            failed = failed.replace(' in strict mode', '')
            failed = failed.replace(' in non-strict mode', '')
            failed = failed.split()
            failed = sorted(set(failed))

            for item in failed:
                list_item = '    <test id="' + item + '"><reason>TODO</reason></test>\n';
                out_list.append(list_item)
    
        out_list = sorted(set(out_list))
        out_file.write(front_template())
        for item in out_list:
            out_file.write(item)
        out_file.write(rear_template())

    print(COLOR_GREEN + 'success: new exclude list generated' + COLOR_RESET)
    sys.exit()


if __name__ == '__main__':
    main()
