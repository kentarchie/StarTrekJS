const QUADRANT_SIZE=8;
const SECTORS_PER_QUADRANT=10;
const MAXROW=24;
const MAXCOL=80;
const DAMAGE_SIZE=9;

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
,totalBases : 0                      /* Total Starbases (b9)*/
,damageRepair : false                              /* Damage Repair Flag */
,currentEnergy : 0.0                                   /* Current Energy */
,startingEnergy : 3000                          /* Starting Energy */
,galaxy : []                                     /* Galaxy (g)*/
,quadrantNameFlag : false                              /* Quadrant name flag */
,k : new Array(4)/*[4][4]*/                               /* Klingon Data */
,k3 : 0                        /* Klingons in Quadrant */
,k7 : 0                               /*  Klingons at start */
,totalKlingonsLeft : 0                             /* Total Klingons left (k9)*/
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
,damageValues : new Array(DAMAGE_SIZE)                                /* Damage Array (d) */
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
	GameData.galaxy = {};	
	GameData.startingStarDate = GameData.currentStarDate;
  	GameData.endOfTime = 25 + getRandomInRange(10);
  	GameData.docked = false;
	GameData.currentEnergy = GameData.startingEnergy;
	GameData.torpedoesLeft = GameData.torpedoCapacity;
	GameData.shieldStrength = 0;
 	GameData.enterpriseQuadrantPosition1 = getRandomInRange(8);
  	GameData.enterpriseQuadrantPosition2 = getRandomInRange(8);
  	GameData.enterpriseSectorPosition1 =   getRandomInRange(8);
  	GameData.enterpriseSectorPosition2 =   getRandomInRange(8);

  	for (var i = 0; i < DAMAGE_SIZE; i++)
    		GameData.damageValues[i] = 0.0;
	
	// setup initial galaxy data
  	for (var row = 0; row < SECTORS_PER_QUADRANT; row++)
		for (var column = 0; column < SECTORS_PER_QUADRANT; column++)
      {
			let klingonCount = getKlingonCount();
			GameData.totalKlingonsLeft += klingonCount;

         let baseInSector = false;
         if (get_rand(100) > 96) baseInSector = true;
			GameData.totalBases += (baseInSector) ? 1 : 0;
			

			let sectorName = i + '_' + j;
			let thisSector = GameData[sectorName];
			thisSector = { star : false, klingons: klingCount, base : baseInSector};
		}
} // initData

// used to get the number of Klingons in a sector
function getKlingonCount()
{
	let k = 0;
	let r1 = getRandomInRange(100);
	if (r1 > 98)
		k = 3;
	else if (r1 > 95)
		k = 2;
	else if (r1 > 80)
		k = 1;
	return k;
} // getKlingonCount

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
