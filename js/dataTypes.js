// various objects used in the program
function Quad(bases,klings,holes,scanned,stars,systemName) 
{
	this.bases = bases;		/* number of bases in this quadrant */
	this.klings = klings;	/* number of Klingons in this quadrant */
	this.holes = holes;		/* number of black holes in this quadrant */
	this.scanned = scanned;	/* star chart entry (see below) */
	this.stars = stars;		/* number of stars in this quadrant */
	this.systenName = systemName;	/* starsystem name (see below) */
} // Quad

/* device names */

function Device(name,person)
{
	this.name = name;		   /* device name */
	this.person = person;	/* the person who fixes it */
} // Device

function Event(x,y,date,eventCode,systemName)
{
	this.x = x;
   this.y = y;			            /* coordinates */
	this.date = date;			      /* trap stardate */
	this.eventCode = eventCode;	/* event type */
	this.systemName = systemName;	/* starsystem name */
} // Event

/*****************************  KLINGONS  *******************************/

function Kling(x,y,power,dist,averageDistance,surrenderRequest)
{
	this.x = x; 
   this.y = y;		/* coordinates */
	this.power = power;		   /* power left */
	this.dist = dist;		      /* distance to Enterprise */
	this.averageDistance = averageDistance;	/* average over this move */
	this.surrenderRequest = surrenderRequest;	/* set if surrender has been requested */
} // Kling

function XY(x,y)
{
	this.x = x;
   this.y = y;		/* coordinates */
} // XY
