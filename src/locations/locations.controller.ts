import { Body, Controller, Param} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { CreateContinentDto, CreateCountryDto, CreateMunicipalityDto, UpdateContinentDto, UpdateCountryDto, UpdateMunicipalityDto } from './create-location.dto';


@Controller('locations')
export class LocationsController {
    constructor(private locationService: LocationsService) {}

    @Get("continent")
    findAll() {
        return this.locationService.locations();
    }

    @Post("continent")
    createContinent(@Body() createContinentData: CreateContinentDto) {
        return this.locationService.createContinent(createContinentData);
    }

    @Patch("continent/:id")
    updateContinent(@Body() updateContinentData: UpdateContinentDto, @Param("id") id : string) {
        return this.locationService.updateContinent({id, ...updateContinentData})
    }

    @Delete("continent/:id")
    deleteContinent(@Param("id") id: string) {
        return this.locationService.deleteContinent(id);
    }


    @Get("country")
    allCountries() {
        return this.locationService.countries();
    }

    @Post("contry")
    createCountry(@Body() createCountryData: CreateCountryDto) {
        return this.locationService.createCountry(createCountryData)
    }

    @Patch("country/:id")
    updateCountry(@Body() updateCountryData: UpdateCountryDto, @Param("id") id: string) {
        return this.locationService.updateCountry({id, ...updateCountryData})
    }

    @Delete("country/:id")
    deleteCountry(@Param("id") id: string) {
        return this.locationService.deleteCountry(id)
    }


    @Get("municipality")
    allMunicipalities() {
        return this.locationService.municipalities();
    }

    @Post("municipality")
    createMunicipality(@Body() createMunicipalityData: CreateMunicipalityDto) {
        return this.locationService.createMunicipality(createMunicipalityData)
    }

    @Patch("municipality/:id") 
    updateMunicipality(@Body() updateContinentData: UpdateMunicipalityDto, @Param("id") id: string) {
        return this.locationService.updateContinent({id, ...updateContinentData})
    }
    
    @Delete("municipality/:id")
    deleteMunicipality(@Param("id") id: string) {
        return this.locationService.deleteMunicipality(id)
    }
    
}
