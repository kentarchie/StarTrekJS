var QUADRANT_SIZE=8;
var SECTORS_PER_QUADRANT=10;

$(document).ready(function() {
	console.log('init:Start ');
	makeDisplayHeader('mainDisplay','thead');
	makeDisplayRows('mainDisplay');
	makeDisplayHeader('mainDisplay','tfoot');
	console.log('init:DONE');
}); // init

var GameData = {
docked : false                                     /* Docked flag */
damageRepair : false                              /* Damage Repair Flag */
currentEnergy : 0.0                                   /* Current Energy */
startingEnergy : 3000                          /* Starting Energy */
galaxy : []                                     /* Galaxy */
quadrantNameFlag : false                              /* Quadrant name flag */
int k[4][4];                               /* Klingon Data */
int k3;                            /* Klingons in Quadrant */
int k7;                               /* Klingons at start */
int k9;                             /* Total Klingons left */
int n;                       /* Number of secors to travel */
int p;                            /* Photon Torpedoes left */
int p0 = 10;                    /* Photon Torpedo capacity */
int q1, q2;             /* Quadrant Position of Enterprise */
int r1, r2;              /* Temporary Location Corrdinates */
int s;                             /* Current shield value */
int s3;                               /* Stars in quadrant */
int s8;                         /* Quadrant locating index */
int s9 = 200;                             /* Klingon Power */
int t0;                               /* Starting Stardate */
int t9;                                     /* End of time */
int z[9][9];                /* Cumulative Record of Galaxy */
int z3;                     /* string_compare return value */
int z1, z2;                /* Temporary Sector Coordinates */
int z4, z5;              /* Temporary quadrant coordinates */

double a, c1;                   /* Used by Library Computer */
double d[9];                                /* Damage Array */
double d4;         /* Used for computing damage repair time */
double s1, s2;     /* Current Sector Position of Enterprise */
double t;                               /* Current Stardate */
double w1;                                   /* Warp Factor */
double x, y, x1, x2;            /* Navigational coordinates */

char sA[4];                       /* An Object in a Sector */
char sC[7];                                   /* Condition */

};

function initData() 
{
	GameData.galaxy = new Array(QUADRANT_SIZE);	
	for(var i=0; i< QUADRANT_SIZE; ++i) {
		GameData.galaxy[i] = new Array(QUADRANT_SIZE);
	}
} // initData

function makeDisplayHeader(display,place)
{
	console.log('makeDisplayHeader:START: place=:'+place+':');
	var row = document.createElement('tr');
	for(var i=0; i< SECTORS_PER_QUADRANT; ++i) {
		var item = document.createElement('th');
		item.innerHTML = i;
		row.appendChild(item);
	}
	$('.'+display+' '+place).append(row);
	console.log('makeDisplayHeader:DONE: place=:'+place+':');
} // makeDisplayHeader

function makeDisplayRows(display)
{
	var first,last,row;
	console.log('makeDisplayRows:START');
	for(var rowNum=0; rowNum< SECTORS_PER_QUADRANT; ++rowNum) {
		//console.log('makeDisplayRows: creatng rowNum=:'+rowNum+':');
		row = document.createElement('tr');
		first = document.createElement('td');
		first.setAttribute('class','displayRowNum');
		first.innerHTML = rowNum;
		row.appendChild(first);
		//console.log('makeDisplayRows: added first rowNum=:'+rowNum+':');

		last = document.createElement('td');
		last.setAttribute('class','displayRowNum');
		last.innerHTML = rowNum;
		for(var i=0; i< SECTORS_PER_QUADRANT; ++i) {
			var item = document.createElement('td');
			item.setAttribute('class','displayCell');
			item.setAttribute('id',rowNum+'_'+i);
			item.innerHTML ='$nbsp;';
			row.appendChild(item);
		}
		row.appendChild(last);
		$('.'+display+' tbody').append(row);
	}
	console.log('makeDisplayHeader:DONE');
} // makeDisplayRows
