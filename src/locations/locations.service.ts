import { ConflictException, Injectable } from '@nestjs/common';
import { Continent, Country, Municipality} from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

//create a guard to check the role of the user, only superadmin and admin can create locations

@Injectable()
export class LocationsService {
    constructor(private prisma: PrismaService) {}

    async locations(): Promise<Continent[]> {
        const result = await this.prisma.continent.findMany({
            include: {
                countries: {
                    include: {
                        municipalities: true
                    }
                }
            }
        })

        return result;
    }

    async createContinent(data: {name: string, comment?: string}): Promise<{
        status: boolean, data?: Continent
    }> {
        try {
            const result = await this.prisma.continent.create({data});

            return {
                status: true,
                data: result
            }
        }catch(error) {
            throw new ConflictException(`Create continent ${error}`);
        }
    }

    async updateContinent(updateData: {id: string, name?: string, comment?: string}): Promise<{
        status: boolean, data?: Continent, error?: string
    }> {
        try {
            const {id, ...data} = updateData;
            const checkContinent = await this.prisma.continent.findUnique({where: {id}});

            if(!checkContinent) {
                return {
                    status: false,
                    error: "This continent doesn't exist"
                };
            }

            const result = await this.prisma.continent.update({
                where: {id},
                data: data
            })

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Update continent ${error}`);
        }
    }

    async deleteContinent(id: string) {
        try {
            const checkContinent = await this.prisma.continent.findUnique({where: {id}});

            if(!checkContinent) {
                return {
                    status: false,
                    error: "This continent doesn't exist"
                };
            }

            const result = await this.prisma.continent.delete({where: {id}});

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Delete continent ${error}`);
        }
    }


    async countries(): Promise<Country[]> {
        return this.prisma.country.findMany({
            include: {
                municipalities: true
            }
        });
    }

    async createCountry(data: {name: string, comment?: string, continentId: string}): Promise<{
        status: boolean, data?: Country
    }> {
        try {
            const result = await this.prisma.country.create({data});

            return {
                status: true,
                data: result
            }
        }catch(error) {
            throw new ConflictException(`Create country ${error}`);
        }
    }

    async updateCountry(updateData: {id: string, name?: string, comment?: string, continentId?: string}): Promise<{
        status: boolean, data?: Continent, error?: string
    }> {
        try {
            const {id, ...data} = updateData;
            const checkCountry = await this.prisma.country.findUnique({where: {id}});

            if(!checkCountry) {
                return {
                    status: false,
                    error: "This country doesn't exist"
                };
            }

            const result = await this.prisma.country.update({
                where: {id},
                data: data
            })

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Update continent ${error}`);
        }
    }

    async deleteCountry(id: string) {
        try {
            const checkCountry = await this.prisma.country.findUnique({where: {id}});

            if(!checkCountry) {
                return {
                    status: false,
                    error: "This country doesn't exist"
                };
            }

            const result = await this.prisma.country.delete({where: {id}});

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Delete country ${error}`);
        }
    }


    async municipalities(): Promise<Municipality[]> {
        const result = this.prisma.municipality.findMany({
            include: {
                country: true
            }
        });

        return result;
    }

    async createMunicipality(data: {name: string, comment?: string, countryId: string}): Promise<{
        status: boolean, data?: Municipality
    }> {
        try {
            const result = await this.prisma.municipality.create({data});

            return {
                status: true,
                data: result
            }
        }catch(error) {
            throw new ConflictException(`Create municipality ${error}`);
        }
    }

    async updateMunicipality(updateData: {id: string, name?: string, comment?: string, countryId?: string}): Promise<{
        status: boolean, data?: Municipality, error?: string
    }> {
        try {
            const {id, ...data} = updateData;
            const checkMunicipality = await this.prisma.municipality.findUnique({where: {id}});

            if(!checkMunicipality) {
                return {
                    status: false,
                    error: "This municipality doesn't exist"
                };
            }

            const result = await this.prisma.municipality.update({
                where: {id},
                data: data
            })

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Update municipality ${error}`);
        }
    }

    async deleteMunicipality(id: string) {
        try {
            const checkMunicipality = await this.prisma.municipality.findUnique({where: {id}});

            if(!checkMunicipality) {
                return {
                    status: false,
                    error: "This municipality doesn't exist"
                };
            }

            const result = await this.prisma.municipality.delete({where: {id}});

            return {
                status: true,
                data: result
            };
        }catch(error) {
            throw new ConflictException(`Delete continent ${error}`);
        }
    }


}
