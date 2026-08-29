import { Injectable } from '@nestjs/common';
import { Continent, Country, Municipality, Prisma, Role_name } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

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

    async countries(): Promise<Country[]> {
        return this.prisma.country.findMany({
            include: {
                municipalities: true
            }
        })
    }

    async municipalities(): Promise<Municipality[]> {
        const result = this.prisma.municipality.findMany({
            include: {
                country: true
            }
        });

        return result;
    }

    async createMunicipality(data: Prisma.MunicipalityCreateInput, creator: Prisma.UserWhereUniqueInput): Promise<{
        status: boolean, error?: string, data?: Municipality
    }> {
        const checkUser = await this.prisma.user.findUnique({
            where: creator,
            include: {
                role: true
            }
        });

        if(checkUser) {
            if(checkUser?.role.name != Role_name.Manager) {
                const result = await this.prisma.municipality.create({data});

                return {
                    status: true,
                    data: result
                }
            }else{
                return {
                    status: false,
                    error: "You aren't allowed to create municipality"
                }
            }
        }else{
            return {
                status: false,
                error: "User not found" 
            }
        }
    }
}
