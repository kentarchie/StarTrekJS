const QUADRANT_SIZE=8;
const SECTORS_PER_QUADRANT=10;
const MAXROW=24;
const MAXCOL=80;

$(document).ready(function() {
	console.log('init:Start ');
	makeDisplayHeader('mainDisplay','thead');
	makeDisplayRows('mainDisplay');
	makeDisplayHeader('mainDisplay','tfoot');
	console.log('init:DONE');
}); // init

var GameData = {
docked : false                                     /* Docked flag (d0) */
,basesInQuadrant : 0                      /* Starbases in quadrant */
,baseLocationInSector : 0                      /* Starbases location in sector */
,totalBases : 0                      /* Total Starbases */
,damageRepair : false                              /* Damage Repair Flag */
,currentEnergy : 0.0                                   /* Current Energy */
,startingEnergy : 3000                          /* Starting Energy */
,galaxy : []                                     /* Galaxy (g)*/
,quadrantNameFlag : false                              /* Quadrant name flag */
,k : new Array(4)/*[4][4]*/                               /* Klingon Data */
,k3 : 0                        /* Klingons in Quadrant */
,k7 : 0                               /*  Klingons at start */
,k9 : 0                             /* Total Klingons left */
,n  : 0                      /* Number of sectors to travel */
,torpedoesLeft  : 0                           /* Photon Torpedoes left (p)*/
,torpedoCapacity  :  10                    /* Photon Torpedo capacity (p0)*/
,enterpriseQuadrantPosition1 : 0
,enterpriseQuadrantPosition2 : 0             /* Quadrant Position of Enterprise (q1,q2)*/
,r1 : 0, r2 : 0              /* Temporary Location Coordinates */
,shieldStrength : 0                             /* Current shield value (s)*/
,s3 : 0                               /* Stars in quadrant */
,s8 : 0                         /* Quadrant locating index */
,s9 : 200                             /* Klingon Power */
,startingStarDate : 0                               /* Starting Stardate (t0)*/
,endOfTime : 0                                     /* End of time (t9) */
,z : new Array(9)/*[9][9]*/                /* Cumulative Record of Galaxy */
,z3 : 0                     /* string_compare return value */
,z1 : 0, z2 : 0                /* Temporary Sector Coordinates */
,z4 : 0, z5 : 0              /* Temporary quadrant coordinates */

,a : 0, c1 : 0                   /* Used by Library Computer */
,d : new Array(9)                                /* Damage Array */
,d4 : 0         /* Used for computing damage repair time */
,enterpriseSectorPosition1 : 0
,enterpriseSectorPosition2 : 0     /* Current Sector Position of Enterprise (s1,s2)*/
,currentStarDate : 0                               /* Current Stardate (t)*/
,w1 : 0                                   /* Warp Factor */
,x : 0, y : 0, x1 : 0, x2 : 0            /* Navigational coordinates */

,sA : new Array(4)                       /* An Object in a Sector */
,sC : new Array(7)                                   /* Condition */

};

function initData() 
{
	GameData.galaxy = new Array(QUADRANT_SIZE);	
	for(var i=0; i< QUADRANT_SIZE; ++i) {
		GameData.galaxy[i] = new Array(QUADRANT_SIZE);
	}
	GameData.startingStarDate = GameData,currentStarDate;
  	GameData.endOfTime = 25 + getRandomInRange(10);
  	GameData.docked = false;
	GameData.currentEnergy = GameData,startingEnergy;
	GameData.torpedoesLeft = GameData,torpedoeCapacity;
	GameData.shieldStrength = 0;
 	GameData.enterpriseQuadrantPosition1 = getRandomInRange(8)();
  	GameDataenterpriseQuadrantPosition2 = getRandomInRange(8)();
  	GameData.enterpriseSectorPosition1 = getRandomInRange(8)();
  	GameData.enterpriseSectorPosition2 = getRandomInRange(8)();
} // initData

function makeDisplayHeader(display,place)
{
	console.log('makeDisplayHeader:START: place=:'+place+':');
	var row = document.createElement('tr');
	var item = document.createElement('th');
	item.innerHTML = '';
	item.setAttribute('class','displayHeaderCell');
	row.appendChild(item);
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
		//console.log('makeDisplayRows: creating rowNum=:'+rowNum+':');
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
			item.innerHTML ='&nbsp;';
			row.appendChild(item);
		}
		row.appendChild(last);
		$('.'+display+' tbody').append(row);
	}
	console.log('makeDisplayHeader:DONE');
} // makeDisplayRows

/* Returns an integer from 1 to iSpread */
function getRandomInRange(iSpread)
{
  return((rand() % iSpread) + 1);
}

function function_r()
{
  return(getRandomInRange(8));
}
