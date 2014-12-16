window.JST = window.JST || {};
var template = function(str){var fn = new Function('obj', 'var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(\''+str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g,function(match,code){return "',"+code.replace(/\\'/g, "'")+",'";}).replace(/<%([\s\S]+?)%>/g,function(match,code){return "');"+code.replace(/\\'/g, "'").replace(/[\r\n\t]/g,' ')+"__p.push('";}).replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+"');}return __p.join('');");return fn;};
window.JST['fragment-annotation-list'] = template('<div class="well" ng-show="annotate_error">\n    <span class="text-danger">Error: {{ annotate_error.message }}</span>\n</div>\n\n<form class="form-inline" role="form">\n    From\n    <div class="form-group">\n        <input required class="form-control" type="text" ng-model="annotation.base_first" size="6"\n         placeholder="Bp" />\n    </div>\n    To\n    <div class="form-group">\n        <input required class="form-control" type="text" ng-model="annotation.base_last" size="6"\n         placeholder="Bp" />\n    </div>\n    <div class="form-group">\n        <input required class="form-control" type="text" ng-model="annotation.name" size="8"\n         placeholder="Name" />\n    </div>\n    <br/>\n    <div class="form-group space-top-small">\n        <select required class="form-control select-mini" ng-model="annotation.type"\n         ng-options="feature_type for feature_type in featureTypes">\n        </select>\n    </div>\n    <div class="form-group space-top-small">\n        <select required class="form-control select-mini" ng-model="annotation.strand">\n            <option value="1">Fwd</option>\n            <option value="-1">Rev</option>\n        </select>\n    </div>\n    <div class="form-group space-top-small">\n        <button class="btn btn-primary" ng-click="addAnnotation(annotation)">Annotate</button>\n    </div>\n</form>\n\n<div class="well space-top">\n<div class="input-group">\n    <span class="input-group-addon"> Search: </span>\n    <input ng-model="query" class=\'form-control\'>\n    <span class="input-group-addon"> Sort by: </span>\n    <select ng-model="annotationOrderProp" class=\'form-control\'>\n        <option value="base_first">Position</option>\n        <option value="name">Alphabetical</option>\n    </select>\n</div>\n</div>\n\n<div ng-if="display_summary == false || (query && query.length >= 2)">\n<table class="table table-striped table-condensed">\n<thead><tr> <th>Start</th> <th>End</th> <th>Name</th> <th>Type</th> <th>Strand</th> </tr></thead>\n<tr ng-repeat="annotation in zoom.annotations | filter:query | orderBy:annotationOrderProp">\n    <td>{{ annotation.base_first }}</td>\n    <td>{{ annotation.base_last }}</td>\n    <td>\n        <a href=\'javascript:void(0);\' ng-click="zoomAt(annotation)" title="{{ annotation.formatted_qualifiers }}"\n         >{{ annotation.display_name }}</a>\n    </td>\n    <td>{{ annotation.type }}</td>\n    <td>{{ annotation.strand }}</td>\n</tr>\n</table>\n</div>\n\n');
window.JST['fragment-detail'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/fragments">Fragments</a> </li>\n        <li ng-bind-html-unsafe=\'fragment.name\'></li>\n    </ol>\n  </div>\n</header>\n\n<div class="container container-wide">\n\n<h3>\n  <div class="dropdown pull-right" ng-if="!genomes">\n    <a class="btn btn-default" href="javascript:void(0);"\n       data-toggle="dropdown">Operations <span class=\'caret\'></span></a>\n    <ul class="dropdown-menu">\n      <li> <a href="/admin/edge/fragment/{{ fragment.id }}/">Edit Name, Status</a> </li>\n    </ul>\n  </div>\n\n  Fragment {{ fragment.id }}: <span ng-bind-html-unsafe=\'fragment.name\'></span>, {{ fragment.length | number }} bps\n</h3>\n\n<p ng-if=\'genomes\' class="lead space-top">\n  <span ng-repeat=\'genome in genomes\'>\n    Genome: <a href="#/genomes/{{ genome.id }}" ng-bind-html-unsafe=\'genome.name\'></a>\n    <br/>\n  </span>\n</p>\n\n<partial template="fragment-layout"></partial>\n\n</div> <!-- container -->\n\n');
window.JST['fragment-layout'] = template('<div class="row">\n\n<!-- left -->\n<div class="col-md-7">\n    <partial template="fragment-left"></partial>\n    <div ng-if="!fetchedAnnotations" class="progress progress-striped active space-top">\n      <div class="progress-bar" role="progressbar"\n           aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">\n        <span class="sr-only">45% Complete</span>\n      </div>\n    </div>\n</div>\n<!-- left -->\n\n<!-- right -->\n<div class="col-md-5">\n    <partial template="fragment-annotation-list"></partial>\n</div> <!-- right -->\n\n</div> <!-- row -->\n');
window.JST['fragment-left'] = template('<div ng-show="display_summary">\n    <span ng-repeat="annotation in summary_annotations | orderBy:base_first"\n          class="pull-left {{ annotation.display_css }}"\n          ng-click="zoomAt(annotation)" title="bp {{ annotation.base_first | number }}">\n        {{ annotation.display_name }}\n    </span>\n    <div class="clearfix"></div>\n    <div ng-if="fragment.length < 10000">\n      <button class="btn btn-primary" ng-click="fetchAllSequence()">Show Sequence</button>\n      <textarea class="sequence" readonly ng-if="sequence">{{ sequence.sequence }}</textarea>\n    </div>\n</div>\n\n<div ng-show="display_summary == false">\n    <div class="well">\n    <div class="input-group">\n        <div class="input-group-addon glyphicon glyphicon-zoom-out" ng-click="zoomOut()"></div>\n        <div class="input-group-addon glyphicon glyphicon-arrow-left" ng-click="zoomMoveLeft()"></div>\n        <div class="input-group-addon"\n             style="top:1px; position:relative;"> {{ zoom.base_first }} bps - {{ zoom.base_last }} bps </div>\n        <div class="input-group-addon glyphicon glyphicon-arrow-right" ng-click="zoomMoveRight()"></div>\n        <div class="input-group-addon glyphicon glyphicon-zoom-in" ng-click="zoomIn()"></div>\n        <div class="input-group-addon glyphicon glyphicon-fullscreen" ng-click="showSummary()"></div>\n    </div>\n    </div>\n\n    <div class="zoom-container">\n        <span ng-repeat="display in zoom.display"\n              class="{{ display.css }}"\n              style="left:{{ display.left }}; top:{{ display.top }}; width:{{ display.width }};"\n              ng-click="zoomAtExact(display.annotation)" title="{{ display.formatted_qualifiers }}">\n            {{ display.title }}\n        </span>\n    </div>\n\n    <div class="clearfix"></div>\n\n    <div class="sequence-container">\n        <button class="btn btn-primary" ng-click="fetchSequence()">Show Sequence</button>\n        <div ng-show="zoom.has_sequence">\n            <div id="sequence-viewer"></div>\n        </div>\n    </div>\n\n</div>\n');
window.JST['fragment-list'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li> <a href="#/fragments">Fragments</a> </li>\n    </ol>\n  </div>\n</header>\n\n<div class="container">\n\n<p class="lead">Fragments</p>\n\n<p>\n    Define an insertion cassette as a fragment first, annotate the fragment,\n    then easily insert the fragment into a genome.\n</p>\n\n<div class="well">\n<div class="input-group">\n    <span class="input-group-addon"> Search: </span>\n    <input ng-model="query" class=\'form-control\' ng-change="delayFetch()">\n</div>\n</div>\n\n<div class="pull-right">\n<button class="btn btn-primary btn-xs"\n        ng-if="hasPrev" ng-click="prevPage()">Prev Page</button>\n&nbsp;\n<button class="btn btn-primary btn-xs"\n        ng-if="hasMore" ng-click="nextPage()">Next Page</button>\n</div>\n\n<table class="table table-striped table-condensed">\n<thead> <tr> <th>ID</th> <th>Name</th> <th>Length</th></tr> </thead>\n<tr ng-repeat="fragment in fragments">\n    <td> <a href="#/fragments/{{fragment.id}}">{{ fragment.id }}</a> </td>\n    <td> <a href="#/fragments/{{fragment.id}}">{{ fragment.name }}</a> </td>\n    <td> {{ fragment.length }} </td>\n</tr>\n</table>\n\n<p class="lead space-top">\nAdd new fragment\n</p>\n\n<div class="well" ng-show="add_fragment_error">\n    <span class="text-danger">Error: {{ add_fragment_error.message }}</span>\n</div>\n\n<form role="form">\n    <div class="form-group">\n        <label for="fragment_name">Name:</label>\n        <input id="fragment_name" type="text" ng-model="fragment.name" />\n    </div>\n    <div class="form-group">\n        <label for="fragment_sequence">Sequence:</label><br/>\n        <textarea id="fragment_sequence" class="sequence" ng-model="fragment.sequence"></textarea>\n    </div>\n    <button class="btn btn-primary" ng-click="addFragment(fragment)">Create Fragment</button>\n</form>\n\n</div> <!-- container -->\n\n');
window.JST['genome-detail'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li ng-bind-html-unsafe=\'genome.name\'></li>\n    </ol>\n  </div>\n</header>\n\n<div class="container">\n\n<h3>\n  <div class="dropdown pull-right">\n    <a class="btn btn-default" href="javascript:void(0);" data-toggle="dropdown">Operations <span class=\'caret\'></span></a>\n    <ul class="dropdown-menu">\n      <li> <a href="#/genomes/{{ genome.id }}/pcr">PCR</a> </li>\n      <li> <a href="#/genomes/{{ genome.id }}/recombination">Recombination</a> </li>\n      <li class="divider"></li>\n      <li> <a href="/admin/edge/genome/{{ genome.id }}/">Edit Name, Status</a> </li>\n    </ul>\n  </div>\n\n  Genome {{ genome.id }}: <span ng-bind-html-unsafe=\'genome.name\'></span>\n</h3>\n\n<div class="lead space-top">\n    <p>Parent: <span ng-bind-html-unsafe="parent"></span></p>\n    <p>Notes: {{ genome.notes }} </p>\n    <p>Changes:</p>\n    <ul><li ng-repeat=\'change in changes\' ng-bind-html-unsafe=\'change\'></li></ul>\n</div>\n\n<table class="table table-striped table-condensed space-top">\n<thead><tr>\n    <th>Fragment</th><th>Length (bps)</th><th>Changes</th>\n</tr></thead>\n<tr ng-repeat="fragment in genome.fragments | orderBy:id">\n    <td> <a href="#/genomes/{{genome.id}}/fragments/{{fragment.id}}"\n          ng-bind-html-unsafe=\'fragment.name\'></a> </td>\n    <td>\n      <span ng-if=\'fragment.length\'>{{fragment.length | number}}</span>\n      <span ng-if=\'!fragment.length\'><em>Not indexed</em></span>\n    </td>\n    <td>\n      <span ng-repeat=\'locs in fragment.changes\'>{{ locs }}</span>\n    </td>\n</tr>\n</table>\n\n<div ng-if="genome.operations" class="space-top">\n  <p class="lead">Operations:</p>\n  <div ng-repeat=\'op in genome.operations\'>\n    <p>\n      {{ op.type }}\n      <span ng-if="op.notes">{{ op.notes }}</span>\n    </p>\n    <ul ng-if="op.params">\n      <li ng-repeat=\'(k,v) in op.params\' class="op-params">\n        {{ k }}: {{ v }}\n      </li>\n    </ul>\n  </div>\n</div>\n\n</div> <!-- container -->\n\n');
window.JST['genome-fragment-layout'] = template('<div class="row">\n\n<!-- left -->\n<div class="col-md-7">\n    <partial template="fragment-left"></partial>\n</div>\n<!-- left -->\n\n<!-- right -->\n<div class="col-md-5">\n    <partial template="fragment-annotation-list"></partial>\n</div> <!-- right -->\n\n</div> <!-- row -->\n');
window.JST['genome-fragment'] = template('<header>\n  <div class="container container-wide">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li> <a href="#/genomes/{{ genome.id }}" ng-bind-html-unsafe=\'genome.name\'></a> </li>\n        <li ng-bind-html-unsafe=\'fragment.name\'></li>\n    </ol>\n  </div>\n</header>\n\n<div class="container container-wide">\n\n<h3>\n  Fragment {{ fragment.id }}:\n  <span ng-bind-html-unsafe=\'fragment.name\'></span>, {{ fragment.length | number }} bps\n</h3>\n\n<div class="lead space-top">\n    <p>Genome: <a href="#/genomes/{{ genome.id }}" ng-bind-html-unsafe=\'genome.name\'></a> </p>\n    <p>Changes:</p>\n    <ul><li ng-repeat="tuple in changes_and_locs">\n            <a href="javascript:void(0);"\n               ng-click="zoomAt(tuple.annotation)">{{ tuple.desc }}</a>\n        </li></ul>\n</div>\n\n<partial template="genome-fragment-layout"></partial>\n\n</div> <!-- container -->\n');
window.JST['genome-list'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li> <a href="#/fragments">Fragments</a> </li>\n    </ol>\n  </div>\n</header>\n\n<div class="container">\n\n<p class="lead">Genomes</p>\n\n<div class="well">\n<div class="input-group">\n    <span class="input-group-addon"> Search: </span>\n    <input class="form-control" ng-model="query" ng-change="delayFetch()">\n</div>\n</div>\n\n<div class="pull-right">\n<button class="btn btn-primary btn-xs"\n        ng-if="hasPrev" ng-click="prevPage()">Prev Page</button>\n&nbsp;\n<button class="btn btn-primary btn-xs"\n        ng-if="hasMore" ng-click="nextPage()">Next Page</button>\n</div>\n\n<table class="table table-striped table-condensed">\n<thead> <tr> <th>ID</th> <th>Name</th> <th>Parent</th></tr> </thead>\n<tr ng-repeat="genome in genomes">\n    <td> <a href="#/genomes/{{genome.id}}">{{ genome.id }}</a> </td>\n    <td> <a href="#/genomes/{{genome.id}}" ng-bind-html-unsafe="genome.name"></a> </td>\n    <td> <a href="#/genomes/{{genome.parent_id}}" ng-bind-html-unsafe=\'genome.parent_name\'></a> </td>\n</tr>\n</table>\n\n</div> <!-- container -->\n');
window.JST['genome-pcr'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li> <a href="#/genomes/{{ genome.id }}"><span ng-bind-html-unsafe=\'genome.name\'></span></a> </li>\n        <li> PCR </li>\n    </ol>\n  </div>\n</header>\n\n<div class="container">\n\n<h3>PCR on Genome {{ genome.id }}: <span ng-bind-html-unsafe=\'genome.name\'></span></h3>\n\n<form role="form" class="space-top">\n    <div class="form-inline">\n        Primers\n        <div class="form-group">\n            <input required class="form-control" type="text" ng-model="primer_a" size="40" />\n        </div>\n        and\n        <div class="form-group">\n            <input required class="form-control" type="text" ng-model="primer_b" size="40" />\n        </div>\n        <button class="btn btn-primary" ng-click="Pcr(primer_a, primer_b)">PCR</button>\n    </div>\n</form>\n\n<div ng-if="results" class="space-top">\n    <div ng-if="results[0]">\n        <p>\n            <span class="label label-success">PCR Product: {{ results[0].length }} bps</span>\n        </p>\n        <div class="sequence sequence-break">{{ results[0] }}</div>\n        <p>\n            Genomic region PCR-ed: {{ results[3].fragment_name }} {{ results[3].region[0] }}-{{ results[3].region[1] }}\n        </p>\n    </div>\n    \n    <div ng-if="!results[0]">\n        <p>\n            <span class="label label-danger">Cannot compute PCR product. Too many or too few binding sites.</span>\n        </p>\n    </div>\n\n    <table class="table table-condensed table-bordered">\n        <tr class="success">\n            <th>Primer</th>\n            <th>Fragment</th>\n            <th>Evalue</th>\n            <th>Alignment</th>\n        </tr>\n\n        <tr ng-repeat="hit in results[1]">\n            <td>\n                Primer1\n                <br/>\n                {{ hit.query_start }}-{{ hit.query_end }}\n            </td>\n            <td>\n                {{ hit.hit_def }}\n                <br/>\n                {{ hit.subject_start }}-{{ hit.subject_end }}\n            </td>\n            <td>\n                {{ hit.evalue }}\n            </td>\n            <td>\n                <div class="alignment">\n                    <div>{{ hit.alignment.subject }}</div>\n                    <div>{{ hit.alignment.matchi }}</div>\n                    <div>{{ hit.alignment.query }}</div>\n                </div>\n            </td>\n        </tr>\n\n        <tr ng-repeat="hit in results[2]">\n            <td>\n                Primer2\n                <br/>\n                {{ hit.query_start }}-{{ hit.query_end }}\n            </td>\n            <td>\n                {{ hit.hit_def }}\n                <br/>\n                {{ hit.subject_start }}-{{ hit.subject_end }}\n            </td>\n            <td>\n                {{ hit.evalue }}\n            </td>\n            <td>\n                <div class="alignment">\n                    <div>{{ hit.alignment.subject }}</div>\n                    <div>{{ hit.alignment.matchi }}</div>\n                    <div>{{ hit.alignment.query }}</div>\n                </div>\n            </td>\n        </tr>\n\n    </table>\n\n</div>\n\n</div>\n');
window.JST['genome-recombination'] = template('<header>\n  <div class="container">\n    <ol class="breadcrumb">\n        <li> Edge </li>\n        <li> <a href="#/genomes">Genomes</a> </li>\n        <li> <a href="#/genomes/{{ genome.id }}"><span ng-bind-html-unsafe=\'genome.name\'></span></a> </li>\n        <li> Recombination </li>\n    </ol>\n  </div>\n</header>\n\n<div class="container">\n\n<h3>Recombination on Genome {{ genome.id }}: <span ng-bind-html-unsafe=\'genome.name\'></span></h3>\n\n<form role="form" class="space-top">\n    <div class="form-inline">\n        Homology arm length\n        <div class="form-group">\n            <input required class="form-control" type="text" ng-model="homology_arm_length" size="5" />\n        </div>\n        New genome name\n        <div class="form-group">\n            <input required class="form-control" type="text" ng-model="new_genome_name" size="20" />\n        </div>\n    </div>\n    Cassette (including homology arms)\n    <br/>\n    <textarea class="form-control sequence" ng-model="cassette"></textarea>\n    <button class="btn btn-primary" ng-click="FindRegions()">Preview</button>\n</form>\n\n<div ng-if="regions !== undefined" class="results">\n    <p ng-if="regions.length === 0"><em>No matching region</em></p>\n    <ul ng-if="regions.length > 0">\n        <li ng-repeat="region in regions">\n            Found homology region on fragment {{ region.fragment_name }}:\n            {{ region.start }}-{{ region.end }} bps\n        </li>\n    </ul>\n    <p ng-if="regions.length === 1">\n      <button class="btn btn-primary" ng-click="Recombine()">Create post-recombination genome</button>\n    </p>\n</div>\n\n</div>\n');
