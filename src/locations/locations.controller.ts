import { Body, Controller } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Get, Post, Patch, Delete } from '@nestjs/common';
import { CreateContinentDto } from './create-location.dto';

@Controller('locations')
export class LocationsController {
    constructor(private locationService: LocationsService) {}

    @Get("/continents")
    findAll() {
        return this.locationService.locations();
    }

    @Post("/continent")
    createContinent(@Body() createContinentData: CreateContinentDto) {
        return this.locationService.createContinent(createContinentData);
    }

    @Patch("/continent")
    updateContinent() {

    }

    @Delete("/continent")
    deleteContinent() {
        
    }


    @Get("/countries")
    allCountries() {
        return this.locationService.countries();
    }

    @Get("/municipalities")
    allMunicipalities() {
        return this.locationService.municipalities();
    }
    
}
