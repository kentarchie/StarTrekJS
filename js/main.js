const QUADRANT_SIZE=8;
const SECTORS_PER_QUADRANT=10;
const MAXROW=24;
const MAXCOL=80;
const DAMAGE_SIZE=9;
const BASE_IN_SECTOR_CUTOFF=96;
const BASE_GAME_TIME=25;

$(document).ready(function() {
	console.log('init:Start ');
	makeDisplayHeader('mainDisplay','thead');
	//makeDisplayRows('mainDisplay');
	makeDisplayHeader('mainDisplay','tfoot');
	initData();
	makeSetupForm();
	console.log('init:DONE');
}); // init

let MQ = new Utilities.MessageQueue();

let displayTable = null;

let spaceData = {
	el: '#spaceDisplay',
	data: {
	  rows: [
	  ]
	}
};

let GameData = {
docked : false                                     /* Docked flag (d0) */
,basesInQuadrant : 0                      /* Starbases in quadrant */
,baseLocationInSector : 0                      /* Starbases location in sector */
,totalBases : 0                      /* Total Starbases (b9)*/
,damageRepair : false                              /* Damage Repair Flag (d1)*/
,currentEnergy : 0.0                                   /* Current Energy */
,startingEnergy : 3000                          /* Starting Energy */
,galaxy : []                                     /* Galaxy (g)*/
,quadrantNameFlag : false                              /* Quadrant name flag */
,k : new Array(4)/*[4][4]*/                               /* Klingon Data */
,k3 : 0                        /* Klingons in Quadrant */
,klingonsAtStart : 0                               /*  Klingons at start (k7)*/
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
  	GameData.currentStarDate = (Utilities.getRandomInRange(20) + 20) * 100;
	GameData.galaxy = new Array(QUADRANT_SIZE).fill(new Array(QUADRANT_SIZE));
	GameData.startingStarDate = GameData.currentStarDate;
  	GameData.endOfTime = BASE_GAME_TIME + Utilities.getRandomInRange(10);
  	GameData.docked = false;
	GameData.currentEnergy = GameData.startingEnergy;
	GameData.torpedoesLeft = GameData.torpedoCapacity;
	GameData.shieldStrength = 0;
 	GameData.enterpriseQuadrantPosition1 = Utilities.getRandomInRange(8);
  	GameData.enterpriseQuadrantPosition2 = Utilities.getRandomInRange(8);
  	GameData.enterpriseSectorPosition1 =   Utilities.getRandomInRange(8);
  	GameData.enterpriseSectorPosition2 =   Utilities.getRandomInRange(8);

  	for (let i = 0; i < DAMAGE_SIZE; i++)
    		GameData.damageValues[i] = 0.0;
	
	//console.log('GameData.galaxy.length = ' + GameData.galaxy.length);
	//console.log('GameData.galaxy[0].length = ' + GameData.galaxy[0].length);
	// setup initial galaxy data
	//console.log('QUADRANT_SIZE = ' + QUADRANT_SIZE + 'SECTORS_PER_QUADRANT = ' + SECTORS_PER_QUADRANT);
   let mainDisplay = [];
  	for (let row = 0; row < QUADRANT_SIZE; row++) {
      let columns = [];
		for (let column = 0; column < QUADRANT_SIZE; column++)
      {
			let klingonCount = getKlingonCount();
			GameData.totalKlingonsLeft += klingonCount;

         let baseInSector = false;
         if (Utilities.getRandomInRange(100) > BASE_IN_SECTOR_CUTOFF) baseInSector = true;
			GameData.totalBases += (baseInSector) ? 1 : 0;
			
			//console.log('row = ' + row + ' column = ' + column);
			let colValue = { 
				star : Utilities.round(Utilities.getRandomInRange(8),0)
				,klingons: klingonCount
				,base : baseInSector
			};
         let displayString = (colValue.star > 0) ? '*' : ' ';
         displayString += (colValue.klingons > 0) ? 'K' : ' ';
         displayString += (colValue.base) ? 'B' : ' ';
         colValue['display'] = displayString;
			columns.push(colValue);
			GameData.galaxy[row][column] = { 
				star : Utilities.round(Utilities.getRandomInRange(8),0)
				,klingons: klingonCount
				,base : baseInSector
            ,display : displayString
			};
			//spaceData.data.rows.push(GameData.galaxy[row][column]);
		}
      mainDisplay.push({ cols: columns});
   }
		spaceData.data.rows = mainDisplay;
      displayTable = new Vue(spaceData);
      //console.log('display data = :'+JSON.stringify(mainDisplay,null,'\t')+':');

	// The number of time units is at least the same as the 
	// number of Klingons
	if (GameData.totalKlingonCount > GameData.endOfTime) 
			GameData.endOfTime = GameData.totalKlingonCount + 1;

	let q1 = Utilities.round(Utilities.getRandomInRange(QUADRANT_SIZE-1),0);
	let q2 = Utilities.round(Utilities.getRandomInRange(QUADRANT_SIZE-1),0);
	//console.log('first: q1 = ' + q1 + ' q2 = ' + q2);
	if(GameData.totalBases == 0) {
      if (GameData.galaxy[q1][q2].klingons < 2) {
         GameData.galaxy[q1][q2].klingons++;
         GameData.totalKlingonsLeft++;
      }

   	GameData.galaxy[q1][q2].base = true;
   	GameData.totalBases++;

   	q1 = Utilities.round(Utilities.getRandomInRange(QUADRANT_SIZE-1),0);
   	q2 = Utilities.round(Utilities.getRandomInRange(QUADRANT_SIZE-1),0);
		//console.log('second: q1 = ' + q1 + ' q2 = ' + q2);
	}
	GameData.klingonsAtStart = GameData.totalKlingonsLeft;
	let sx = (GameData.totalBases != 1) ? 's' : ''; 
	let sx0 = (GameData.totalBases != 1) ? 'are' : 'is'; 
	
  	MQ.enqueue("Your orders are as follows:\n\n");
  	MQ.enqueue("   Destroy the " + GameData.totalKlingonsLeft + " Klingon warships which have invaded\n" );
  	MQ.enqueue(" the galaxy before they can attack Federation Headquarters\n");
  	MQ.enqueue(" on stardate " + Utilities.round((GameData.startingStarDate  + GameData.endOfTime),2)  + ". This gives you " + Utilities.round(GameData.endOfTime,0) + " days. There " + sx0+ "\n");
  	MQ.enqueue(GameData.totalBases + " starbase" + sx + " in the galaxy for resupplying your ship.\n\n");
  	//MQ.enqueue("Hit any key to accept command. ");
   MQ.runQueue();
	
} // initData

// used to get the number of Klingons in a sector
function getKlingonCount()
{
	let k = 0; // most sectors will have 0 Klingons
	let r1 = Utilities.getRandomInRange(100);
   //console.log(`getKlingonCount: r1=:${r1}:`);
	if (r1 > 98)  // 2% chance of 3 Klingons
		k = 3;
	else if (r1 > 95)  // 5% chance of 3 Klingons
		k = 2;
	else if (r1 > 80) // 20% chance of 1 Klingon
		k = 1;
	return k;
} // getKlingonCount

function makeDisplayHeader(display,place)
{
	//console.log('makeDisplayHeader:START: place=:'+place+':');
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
	//console.log('makeDisplayHeader:DONE: place=:'+place+':');
} // makeDisplayHeader

function makeDisplayRows(display)
{
	var first,last,row;
	//console.log('makeDisplayRows:START');
	//for(var rowNum=0; rowNum< SECTORS_PER_QUADRANT; ++rowNum) {
		//console.log('makeDisplayRows: creating rowNum=:'+rowNum+':');
		row = document.createElement('tr');
		row.setAttribute('v-for','row in rows');
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
			item.innerHTML ='{{row.star}}';
			row.appendChild(item);
			item = document.createElement('td');
			item.setAttribute('class','displayCell');
			item.setAttribute('id',rowNum+'_'+i);
			item.innerHTML ='{{row.klingons}}';
			row.appendChild(item);
			item = document.createElement('td');
			item.setAttribute('class','displayCell');
			item.setAttribute('id',rowNum+'_'+i);
			item.innerHTML ='{{row.base}}';
			row.appendChild(item);
		}
		row.appendChild(last);
		$('.'+display+' tbody').append(row);
	//}
	//console.log('makeDisplayHeader:DONE');
} // makeDisplayRows

function makeSetupForm()
{
	$('#menuToggle').removeClass('initialPlace'); 
	console.log('class removed');
	$('#openSettings').click(function(ev) {
		let menu=$('#menuToggle');
		let buttonLabel = $.trim($(this).html());
		buttonLabel = (buttonLabel == 'Open') ? 'Close' : 'Open';
		$(this).html(buttonLabel);
		menu.toggleClass('offScreen');
		menu.toggleClass('onScreen');
	});
} // makeSetupForm
