#!/usr/bin/env python

from setuptools import setup, find_packages

import os
import sys
import subprocess

with open("requirements.txt", "r") as f:
    install_requires = [x.strip() for x in f.readlines() if not x.strip().startswith("#")]

setup(name="edge",
      version="0.3",
      author="Ginkgo Bioworks",
      author_email="team@ginkgobioworks.com",
      description="Genome Engineering Tool",
      license="MIT",
      packages=['edge'],
      package_dir={"": "src"},
      include_package_data=True,
      zip_safe=True,
      install_requires=install_requires)
