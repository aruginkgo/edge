
## Edge

Edge keeps track of proposed structural changes between a parent genome and its
derived genomes. Users can create a derived genome by making changes to the
sequence of the parent genome. Derived genomes inherit annotations and fixes
from parents whenever appropriate.


### Why?

Edge efficiently keeps track of structural changes between genomes, and at the
same time allows a derived genome to inherit annotations from its ancestors,
even annotations and fixes applied to an ancestor after the derived genome was
created. You can consider Edge as the "git" tool for genome engineering.

The necessary storage cost to store a derived genome is O(D), where D is the
number of differences between the derived genome and its parent. The current
implementation additionally uses a cache of annotation to base pair number for
each genome. While this cache is O(N), where N is the number of annotations, it
is soft-data and can be discarded.


### What Edge is NOT

Edge is not a genome sequence analyzer or viewer. There are much better tools
for those purposes. Edge's main goal is to keep track of genomic changes across
lineages in a structured fashion, so users can annotation, fix, and compare
genome sequences and features. While Edge comes with a simple viewer UI to look
at features and sequences, the UI is primitive. Edge does provide tools to
export genome sequences and annotations as GFF files.


### Try it

Construct your virtual env and pip install dependencies (use
requirements/{dev,core}.txt).

To start a server,

```
python src/manage.py syncdb --noinput
python src/manage.py migrate
(cd example; gunzip ecoli-mg1655.gff.gz; gunzip yeast.gff.gz)
python src/manage.py import_gff 'E. coli MG1655' example/ecoli-mg1655.gff
python src/manage.py import_gff 'Saccharomyces cerevisiae' example/yeast.gff
python src/manage.py runserver 0.0.0.0:8000
```

Then set your browser to ```http://<your IP>:8000/edge/```

You can edit genome and fragment metadata, such as name, notes, circular
attributes, from Django admin. Create a Django admin superuser, then set your
browser to ```http://<your IP>:8000/admin/```

