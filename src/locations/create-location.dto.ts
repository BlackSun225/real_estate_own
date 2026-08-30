
export class CreateContinentDto {
    name!: string;
    comment!: string;
}

export class UpdateContinentDto {
    name?: string;
    comment?: string;
}


export class CreateCountryDto {
    name!: string;
    comment!: string;
    continentId!: string;
}

export class UpdateCountryDto {
    name?: string;
    comment?: string;
    continentId?: string;
}


export class CreateMunicipalityDto {
    name!: string;
    comment!: string;
    countryId!: string;
}

export class UpdateMunicipalityDto {
    name?: string;
    comment?: string;
    countryId?: string;
}