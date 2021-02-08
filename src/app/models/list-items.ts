interface AgentInfo {
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
