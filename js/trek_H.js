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

/* ascii names of systems */
extern char	*Systemname[NINHAB];

/* quadrant definition */
struct quad	Quad[NQUADS][NQUADS];


/* current sector map */
char	Sect[NSECTS][NSECTS];

/* systemname conventions:
 *	1 -> NINHAB	index into Systemname table for reported distress calls
 *
 * evcode conventions:
 *	1 -> NEVENTS-1	event type
 *	+ E_HIDDEN	unreported (SSradio out)
 *	+ E_GHOST	actually already expired
 *	0		unallocated
 */

struct device	Device[NDEV];


struct event	Event[MAXEVENTS];	/* dynamic event list; one entry per pending event */

/* information regarding the state of the starship */
struct
{
	double	warp;		/* warp factor */
	double	warp2;		/* warp factor squared */
	double	warp3;		/* warp factor cubed */
	char	shldup;		/* shield up flag */
	char	cloaked;	/* set if cloaking device on */
	int	energy;		/* starship's energy */
	int	shield;		/* energy in shields */
	double	reserves;	/* life support reserves */
	int	crew;		/* ship's complement */
	int	brigfree;	/* space left in brig */
	char	torped;		/* torpedoes */
	char	cloakgood;	/* set if we have moved */
	int	quadx;		/* quadrant x coord */
	int	quady;		/* quadrant y coord */
	int	sectx;		/* sector x coord */
	int	secty;		/* sector y coord */
	char	cond;		/* condition code */
	char	sinsbad;	/* Space Inertial Navigation System condition */
	char	*shipname;	/* name of current starship */
	char	ship;		/* current starship */
	int	distressed;	/* number of distress calls */
}	Ship;

/* sinsbad is set if SINS is working but not calibrated */

/* game related information, mostly scoring */
struct
{
	int	killk;		/* number of klingons killed */
	int	deaths;		/* number of deaths onboard Enterprise */
	char	negenbar;	/* number of hits on negative energy barrier */
	char	killb;		/* number of starbases killed */
	int	kills;		/* number of stars killed */
	char	skill;		/* skill rating of player */
	char	length;		/* length of game */
	char	killed;		/* set if you were killed */
	char	killinhab;	/* number of inhabited starsystems killed */
	char	tourn;		/* set if a tournament game */
	char	passwd[15];	/* game password */
	char	snap;		/* set if snapshot taken */
	char	helps;		/* number of help calls */
	int	captives;	/* total number of captives taken */
}	Game;

/* per move information */
struct
{
	char	free;		/* set if a move is free */
	char	endgame;	/* end of game flag */
	char	shldchg;	/* set if shields changed this move */
	char	newquad;	/* set if just entered this quadrant */
	char	resting;	/* set if this move is a rest */
	double	time;		/* time used this move */
}	Move;

/* parametric information */
struct
{
	char	bases;		/* number of starbases */
	char	klings;		/* number of klingons */
	double	date;		/* stardate */
	double	time;		/* time left */
	double	resource;	/* Federation resources */
	int	energy;		/* starship's energy */
	int	shield;		/* energy in shields */
	double	reserves;	/* life support reserves */
	int	crew;		/* size of ship's complement */
	int	brigfree;	/* max possible number of captives */
	char	torped;		/* photon torpedos */
	double	damfac[NDEV];	/* damage factor */
	double	dockfac;	/* docked repair time factor */
	double	regenfac;	/* regeneration factor */
	int	stopengy;	/* energy to do emergency stop */
	int	shupengy;	/* energy to put up shields */
	int	klingpwr;	/* Klingon initial power */
	int	warptime;	/* time chewer multiplier */
	double	phasfac;	/* Klingon phaser power eater factor */
	char	moveprob[6];	/* probability that a Klingon moves */
	double	movefac[6];	/* Klingon move distance multiplier */
	double	eventdly[NEVENTS];	/* event time multipliers */
	double	navigcrud[2];	/* navigation crudup factor */
	int	cloakenergy;	/* cloaking device energy per stardate */
	double	damprob[NDEV];	/* damage probability */
	double	hitfac;		/* Klingon attack factor */
	int	klingcrew;	/* number of Klingons in a crew */
	double	srndrprob;	/* surrender probability */
	int	energylow;	/* low energy mark (cond YELLOW) */
}	Param;

/* Sum of damage probabilities must add to 1000 */

/* other information kept in a snapshot */
struct
{
	char	bases;		/* number of starbases */
	char	klings;		/* number of klingons */
	double	date;		/* stardate */
	double	time;		/* time left */
	double	resource;	/* Federation resources */
	char	distressed;	/* number of currently distressed quadrants */
	struct event	*eventptr[NEVENTS];	/* pointer to event structs */
	struct xy	base[MAXBASES];		/* locations of starbases */
}	Now;

/* Other stuff, not dumped in a snapshot */
struct
{
	struct kling	klingon[MAXKLQUAD];	/* sorted Klingon list */
	char		nkling;			/* number of Klingons in this sector */
						/* < 0 means automatic override mode */
	char		fast;			/* set if speed > 300 baud */
	struct xy	starbase;	/* starbase in current quadrant */
	char		snapshot[sizeof Quad + sizeof Event + sizeof Now];	/* snapshot for time warp */
	char		statreport;		/* set to get a status report on a srscan */
}	Etc;

/*
 *	eventptr is a pointer to the event[] entry of the last
 *	scheduled event of each type.  Zero if no such event scheduled.
 */

let Device = [
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
};

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

