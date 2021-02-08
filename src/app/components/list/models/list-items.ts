export interface AgentInfo {
	firstname: string;
	lastname: string;
	company: string;
	splashMessage: string;
	customHeader: string;
}

export interface Geocode {
	Longitude: string;
	Latitude: string;
	Percision: string;
	IsValid: boolean;
}

export interface ListItem {
	listID: number;
	order: number;
	propertyID: number;
	name: string;
	streetAddress: string;
	city: string;
	state: string;
	pets: boolean;
	washerDry: string;
	photo: string;
	favorite: boolean;
	highestSentCommissions: number;
	onsiteManager: string;
	management: string;
	proximity: number;
	section8: boolean;
	seniorHousing: boolean;
	studentHousting: boolean;
	floorplans: string[];
	highValueAmenities: string[];
	paidUtilities: string[];
	geocode: Geocode;
}

export interface ListItems {
	agentInfo: AgentInfo;
	records: ListItem[];
	showContactInfo: boolean;
	role: string;
}

interface Parking {
	propertyID: number;
	reserved: boolean;
	reservedFeeMin: number;
	reservedFeeMax: number;
	covered: boolean;
	coveredFeeMin: number;
	coveredFeeMax: number;
	garage: boolean;
	garageFeeMin: number;
	garageFeeMax: number;
	detached: boolean;
	detachedFeeMin: number;
	detachedFeeMax: number;
	breezeway: boolean;
	attached: boolean;
}

interface PetInfo {
	allowed: boolean;
	extraRent: number;
	limit: number;
	weight: number;
	breedRestriction: boolean;
	nonRefundableFee: number;
}

interface ManagementOffice {
	streetAddress: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	headquarters: boolean;
}

export interface PropertyItem {
	listID: number;
	propertyID: number;
	yearBuilt: number;
	yearRenovated: number;
	name: string;
	streetAddress: string;
	neighborhood: string;
	phone: string;
	city: string;
	adminFee: number;
	appFee: number;
	url: string;
	favorite: boolean;
	notes: '';
	specials: null;
	parking: Parking;
	schoolsInfo: null;
	petInfo: PetInfo;
	paidUtilities: string[];
	floorplans: string[];
	highValueAmenities: string[];
	unitAmenities: string[];
	propertyAmenities: string[];
	geocode: Geocode;
	photos: string[];
	section8: boolean;
	studentHousting: boolean;
	seniorHousing: boolean;
	officeHours: string;
	numUnits: number;
	email: string;
	role: string;
	management: string;
	managementOffices: ManagementOffice[];
	regionalName: string;
	regionalPhone: string;
	regionalEmail: string;
	onsiteManager: string;
}
