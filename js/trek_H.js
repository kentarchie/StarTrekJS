/*
**  Global Declarations
**
**	Virtually all non-local variable declarations are made in this
**	file.  Exceptions are those things which are initialized, which
**	are defined in "externs.c", and things which are local to one
**	program file.
**
**	So far as I know, nothing in here must be preinitialized to
**	zero.
*/

/* external function definitions */
//extern double	franf();	/* floating random number function */
//extern double	sqrt();		/* square root */
//extern double	sin(), cos();	/* trig functions */
//extern double	atan2();	/* fancy arc tangent function */
//extern double	log();		/* log base e */
//extern double	pow();		/* power function */
//extern double	fabs();		/* absolute value function */
//extern double	exp();		/* exponential function */

let Constants = {
/*********************  GALAXY  **************************/
/* galactic parameters */
   NSECTS	:	10	/* dimensions of quadrant in sectors */
	,NQUADS	:	8	/* dimension of galaxy in quadrants */
	,NINHAB	:	32	/* number of quadrants which are inhabited */
	,Q_DISTRESSED	:	0200
	,Q_SYSTEM	   :	077
/* defines for sector map  (below) */
	,EMPTY	   :	'.'
	,STAR	      :	'*'
	,BASE	      :	'#'
	,ENTERPRISE	:	'E'
	,QUEENE	   :	'Q'
	,KLINGON	   :	'K'
	,INHABIT	   :	'@'
	,HOLE	      :	' '
/************************ DEVICES ******************************/

	,NDEV	:	16	/* max number of devices */

/* device tokens */
	,WARP	      :	0	/* warp engines */
	,SRSCAN	   :	1	/* short range scanners */
	,LRSCAN	   :	2	/* long range scanners */
	,PHASER	   :	3	/* phaser control */
	,TORPED	   :	4	/* photon torpedo control */
	,IMPULSE	   :	5	/* impulse engines */
	,SHIELD	   :	6	/* shield control */
	,COMPUTER	:	7	/* on board computer */
	,SSRADIO	   :	8	/* subspace radio */
	,LIFESUP	   :	9	/* life support systems */
	,SINS	      :	10	/* Space Inertial Navigation System */
	,CLOAK	   :	11	/* cloaking device */
	,XPORTER	   :	12	/* transporter */
	,SHUTTLE	   :	13	/* shuttlecraft */
/***************************  EVENTS  ****************************/

	,NEVENTS	:	12	/* number of different event types */
	
	,E_LRTB	   :	1	/* long range tractor beam */
	,E_KATSB	   :	2	/* Klingon attacks starbase */
	,E_KDESB	   :	3	/* Klingon destroys starbase */
	,E_ISSUE	   :	4	/* distress call is issued */
	,E_ENSLV	   :	5	/* Klingons enslave a quadrant */
	,E_REPRO	   :	6	/* a Klingon is reproduced */
	,E_FIXDV	   :	7	/* fix a device */
	,E_ATTACK	:	8	/* Klingon attack during rest period */
	,E_SNAP	   :	9	/* take a snapshot for time warp */
	,E_SNOVA	   :	10	/* supernova occurs */
	
	,E_GHOST	   :	0100	/* ghost of a distress call if ssradio out */
	,E_HIDDEN	:	0200	/* event that is unreportable because ssradio out */
	,E_EVENT	   :	077	/* mask to get event code */
	
	,MAXEVENTS	:	25	/* max number of concurrently pending events */
	,MAXKLQUAD	:	9	/* maximum klingons per quadrant */

/********************** MISCELLANEOUS ***************************/

/* condition codes */
	,GREEN	:	0
	,DOCKED	:	1
	,YELLOW	:	2
	,RED	   :	3

/* starbase coordinates */
	,MAXBASES	:	9	/* maximum number of starbases in galaxy */

/*  distress calls  */
	,MAXDISTR	:	5	/* maximum concurrent distress calls */

/* phaser banks */
	,NBANKS	:	6	/* number of phaser banks */

/* Klingon move indicies */
	,KM_OB	:	0	/* Old quadrant, Before attack */
	,KM_OA	:	1	/* Old quadrant, After attack */
	,KM_EB	:	2	/* Enter quadrant, Before attack */
	,KM_EA	:	3	/* Enter quadrant, After attack */
	,KM_LB	:	4	/* Leave quadrant, Before attack */
	,KM_LA	:	5	/* Leave quadrant, After attack */

	/* you lose codes */
	,L_NOTIME	:	1	/* ran out of time */
	,L_NOENGY	:	2	/* ran out of energy */
	,L_DSTRYD	:	3	/* destroyed by a Klingon */
	,L_NEGENB	:	4	/* ran into the negative energy barrier */
	,L_SUICID	:	5	/* destroyed in a nova */
	,L_SNOVA	   :	6	/* destroyed in a supernova */
	,L_NOLIFE	:	7	/* life support died (so did you) */
	,L_NOHELP	:	8	/* you could not be rematerialized */
	,L_TOOFAST	:	9	/* pretty stupid going at warp 10 */
	,L_STAR	   :	10	/* ran into a star */
	,L_DSTRCT	:	11	/* self destructed */
	,L_CAPTURED	:	12	/* captured by Klingons */
	,L_NOCREW	:	13	/* you ran out of crew */
}; // Constants


/*  systemname conventions:
 *	1 -> NINHAB	index into Systemname table for live system.
 *	+ Q_DISTRESSED	distressed starsystem -- systemname & Q_SYSTEM
 *			is the index into the Event table which will
 *			have the system name
 *	0		dead or nonexistent starsystem
 *
 *  starchart ("scanned") conventions:
 *	0 -> 999	taken as is
 *	-1		not yet scanned ("...")
 *	1000		supernova ("///")
 *	1001		starbase + ??? (".1.")
*/


/* quadrant definition */
//struct quad	Quad[NQUADS][NQUADS];


/* current sector map */
//char	Sect[NSECTS][NSECTS];

/* systemname conventions:
 *	1 -> NINHAB	index into Systemname table for reported distress calls
 *
 * evcode conventions:
 *	1 -> NEVENTS-1	event type
 *	+ E_HIDDEN	unreported (SSradio out)
 *	+ E_GHOST	actually already expired
 *	0		unallocated
 */

/* dynamic event list; one entry per pending event */
let Events = new Array(Constants.MAXEVENTS);	

/* information regarding the state of the starship */
let Ship = {
	warp :       0.0		/* warp factor */
	,warp2 :     0.0		/* warp factor squared */
	,warp3 :     0.0		/* warp factor cubed */
	,shldup : 	 ''		/* shield up flag */
	,cloaked :   ''	/* set if cloaking device on */
	,energy : 	 0		/* starship's energy */
	,shield : 	 0		/* energy in shields */
	,reserves :  0.0	/* life support reserves */
	,crew : 		 0		/* ship's complement */
	,brigfree :  0	/* space left in brig */
	,torped :    ''		/* torpedoes */
	,cloakgood : ''	/* set if we have moved */
	,quadx :     0		/* quadrant x coord */
	,quady :     0		/* quadrant y coord */
	,sectx :     0		/* sector x coord */
	,secty :     0		/* sector y coord */
	,cond :      ''		/* condition code */
	,sinsbad :  ''	/* Space Inertial Navigation System condition */
	,shipname :  ''	/* name of current starship */
	,ship :      ''		/* current starship */
	,distressed : 0	/* number of distress calls */
}	// Ship;

/* sinsbad is set if SINS is working but not calibrated */

/* game related information, mostly scoring */
let Game = {
	killk : 0		/* number of klingons killed */
	,deaths : 0		/* number of deaths onboard Enterprise */
	,negenbar : ''	/* number of hits on negative energy barrier */
	,killb : ''		/* number of starbases killed */
	,kills : 0		/* number of stars killed */
	,skill : ''		/* skill rating of player */
	,length : ''		/* length of game */
	,killed : ''		/* set if you were killed */
	,killinhab : ''	/* number of inhabited starsystems killed */
	,tourn : ''		/* set if a tournament game */
	,passwd : new Array(15)	/* game password */
	,snap : ''		/* set if snapshot taken */
	,helps : ''		/* number of help calls */
	,captives : 0	/* total number of captives taken */
}	//Game;

/* per move information */
let Move = {
	free : ''		/* set if a move is free */
	,endgame : ''	/* end of game flag */
	,shldchg : ''	/* set if shields changed this move */
	,newquad : ''	/* set if just entered this quadrant */
	,resting : ''	/* set if this move is a rest */
	,time : 0.0		/* time used this move */
}	//Move;

/* parametric information */
let Param = {
	bases : 0		/* number of starbases */
	,klings : 0		/* number of klingons */
	,date : 0.0		/* stardate */
	,time : 0.0		/* time left */
	,resource : 0.0	/* Federation resources */
	,energy : 0		/* starship's energy */
	,shield : 0		/* energy in shields */
	,reserves : 0.0	/* life support reserves */
	,crew : 0		/* size of ship's complement */
	,brigfree : 0	/* max possible number of captives */
	,torped : 0		/* photon torpedos */
	,dockfac : 0.0	/* docked repair time factor */
	,regenfac : 0.0	/* regeneration factor */
	,stopengy : 0	/* energy to do emergency stop */
	,shupengy : 0	/* energy to put up shields */
	,klingpwr : 0	/* Klingon initial power */
	,warptime : 0	/* time chewer multiplier */
	,phasfac : 0.0	/* Klingon phaser power eater factor */
	,cloakenergy : 0	/* cloaking device energy per stardate */
	,hitfac : 0.0		/* Klingon attack factor */
	,klingcrew : 0	/* number of Klingons in a crew */
	,srndrprob : 0.0	/* surrender probability */
	,energylow : 0	/* low energy mark (cond YELLOW) */
	,moveprob   : Array(6).fill(0) /* probability that a Klingon moves */
	,movefac    : Array(6).fill(0.0) /* Klingon move distance multiplier */
	,eventdly   : Array(Constants.NEVENTS).fill(0.0) /* event time multipliers */
	,navigcrud  : Array(2).fill(0.0) /* navigation crudup factor */
	,damprob    : Array(Constants.NDEV).fill(0.0) /* damage probability */
	,damfacnew  : Array(Constants.NDEV).fill(0.0)	/* damage factor */
}	//Param;

/* Sum of damage probabilities must add to 1000 */

/* other information kept in a snapshot */
let Now = {
	bases : 0		/* number of starbases */
	,klings : 0		/* number of klingons */
	,date : 0.0		/* stardate */
	,time : 0.0		/* time left */
	,resource : 0.0	/* Federation resources */
	,distressed : 0	/* number of currently distressed quadrants */
	,eventptr : new Array(Constants.NEVENTS)	/* pointer to event structs */
	,base : new Array(Constants.MAXBASES)		/* locations (xy)  of starbases */
}	//Now;

/* Other stuff, not dumped in a snapshot */
let Etc = {
	klingon : new Array(Constants.MAXKLQUAD)	/* sorted Klingon list */
	,nkling : 0			/* number of Klingons in this sector */
						/* < 0 means automatic override mode */
	,fast : 0			/* set if speed > 300 baud */
	,starbase : null	/* starbase in (xy) current quadrant */
	,snapshot : null	/* array snapshot for time warp */
	,statreport : false		/* set to get a status report on a srscan */
}	//Etc;

/*
 *	eventptr is a pointer to the event[] entry of the last
 *	scheduled event of each type.  Zero if no such event scheduled.
 */

let Devices = [
   { device : 'warp drive',         person : 'Scotty'}
   ,{ device : 'S.R. scanners',      person : 'Scotty'}
   ,{ device : 'L.R. scanners',      person : 'Scotty'}
   ,{ device : 'phasers',            person : 'Sulu'}
   ,{ device : 'photon tubes',       person : 'Sulu'}
   ,{ device : 'impulse engines',    person : 'Scotty'}
   ,{ device : 'shield control',     person : 'Sulu'}
   ,{ device : 'computer',           person : 'Spock'}
   ,{ device : 'subspace radio',     person : 'Uhura'}
   ,{ device : 'life support',       person : 'Scotty'}
   ,{ device : 'navigation system',  person : 'Chekov'}
   ,{ device : 'cloaking device',    person : 'Scotty'}
   ,{ device : 'transporter',        person : 'Scotty'}
   ,{ device : 'shuttlecraft',       person : 'Scotty'}
   ,{ device : '*ERR 14*',           person : 'Nobody'}
   ,{ device : '*ERR 15*',           person : 'Nobody'}
];

/* ascii names of systems */
let Systemname = [
	'ERROR'
	,'Talos IV'
	,'Rigel III'
	,'Deneb VII'
	,'Canopus V'
	,'Icarus I'
	,'Prometheus II'
	,'Omega VII'
	,'Elysium I'
	,'Scalos IV'
	,'Procyon IV'
	,'Arachnid I'
	,'Argo VIII'
	,'Triad III'
	,'Echo IV'
	,'Nimrod III'
	,'Nemisis IV'
	,'Centarurus I'
	,'Kronos III'
	,'Spectros V'
	,'Beta III'
	,,'Gamma Tranguli VI'
	,'Pyris III'
	,'Triachus'
	,'Marcus XII'
	,'Kaland'
	,'Ardana'
	,'Stratos'
	,'Eden'
	,'Arrikis'
	,'Epsilon Eridani IV'
	,'Exo III'
];
