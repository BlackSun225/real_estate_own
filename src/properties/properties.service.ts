import { BadRequestException, Injectable } from '@nestjs/common';
import { Property, Property_category, Property_type_enum, Property_type, Sub_property, Property_status } from '../generated/prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PropertiesService {
    constructor(private prisma: PrismaService) {}

    private property_Type_Seed = [
        {
            name: Property_type_enum.Commercial,
            description: "Properties used for business activities, including shopping centers, offices, restaurants, hotels, medical facilities, and sports arenas."
        },
        {
            name: Property_type_enum.Industrial,
            description: "Properties used for manufacturing, production, storage, and distribution, such as warehouses and factories."
        },
        {
            name: Property_type_enum.Land,
            description: "Undeveloped or developed plots of land used for construction, agriculture, investment, or other purposes."
        },
        {
            name: Property_type_enum.Residential,
            description: "Properties designed for people to live in, such as apartments, duplexes, townhouses, and condominiums."
        },
        {
            name: Property_type_enum.Special,
            description: "Properties designed for specific public, religious, or community uses, such as government buildings, schools, places of worship, cemeteries, and public hospitals."
        }
    ]

    private realEstateCategories = [
        // Residential
        {
            name: "Apartment",
            type: Property_type_enum.Residential,
            description: "A self-contained housing unit within a building."
        },
        {
            name: "Duplex",
            type: Property_type_enum.Residential,
            description: "A residential property divided into two separate living units."
        },
        {
            name: "Townhouse",
            type: Property_type_enum.Residential,
            description: "A multi-story home attached to neighboring houses."
        },
        {
            name: "Condominium",
            type: Property_type_enum.Residential,
            description: "An individually owned housing unit within a shared building or community."
        },
        {
            name: "Villa",
            type: Property_type_enum.Residential,
            description: "A spacious private home, often with a garden or outdoor amenities."
        },
        {
            name: "Penthouse",
            type: Property_type_enum.Residential,
            description: "A luxury apartment located on the top floor of a building."
        },
        {
            name: "Studio",
            type: Property_type_enum.Residential,
            description: "A compact apartment combining living, sleeping, and kitchen areas."
        },
        {
            name: "Multi-Family Home",
            type: Property_type_enum.Residential,
            description: "A building containing multiple independent residential units."
        },

        // Commercial
        {
            name: "Shopping Center",
            type: Property_type_enum.Commercial,
            description: "A complex of retail stores and businesses serving shoppers."
        },
        {
            name: "Office",
            type: Property_type_enum.Commercial,
            description: "A property designed for professional and administrative work."
        },
        {
            name: "Restaurant",
            type: Property_type_enum.Commercial,
            description: "A property used for preparing and serving food and beverages."
        },
        {
            name: "Hotel",
            type: Property_type_enum.Commercial,
            description: "A property providing temporary accommodation and hospitality services."
        },
        {
            name: "Medical Facility",
            type: Property_type_enum.Commercial,
            description: "A property used for private healthcare services and medical treatment."
        },
        {
            name: "Sports Arena",
            type: Property_type_enum.Commercial,
            description: "A facility designed for sporting events and entertainment."
        },
        {
            name: "Retail Store",
            type: Property_type_enum.Commercial,
            description: "A commercial property used for selling goods directly to customers."
        },
        {
            name: "Business Center",
            type: Property_type_enum.Commercial,
            description: "A facility offering office spaces and business services."
        },
        {
            name: "Mixed-Use Building",
            type: Property_type_enum.Commercial,
            description: "A property combining commercial spaces with residential or other uses."
        },

        // Land
        {
            name: "Residential",
            type: Property_type_enum.Land,
            description: "A plot of land intended for residential construction."
        },
        {
            name: "Commercial",
            type: Property_type_enum.Land,
            description: "A plot of land intended for commercial development."
        },
        {
            name: "Agricultural",
            type: Property_type_enum.Land,
            description: "Land used for farming, cultivation, or livestock activities."
        },
        {
            name: "Industrial",
            type: Property_type_enum.Land,
            description: "A plot of land intended for industrial development."
        },
        {
            name: "Mixed-Use",
            type: Property_type_enum.Land,
            description: "Land suitable for a combination of residential, commercial, or other developments."
        },
        {
            name: "Vacant",
            type: Property_type_enum.Land,
            description: "Undeveloped land available for future construction or investment."
        },
        {
            name: "Recreational",
            type: Property_type_enum.Land,
            description: "Land intended for outdoor activities, leisure, or recreation."
        },

        // Industrial
        {
            name: "Warehouse",
            type: Property_type_enum.Industrial,
            description: "A building used for storing and distributing goods."
        },
        {
            name: "Factory",
            type: Property_type_enum.Industrial,
            description: "A facility where products are manufactured or assembled."
        },
        {
            name: "Distribution Center",
            type: Property_type_enum.Industrial,
            description: "A facility used for receiving, sorting, and distributing goods."
        },
        {
            name: "Industrial Park",
            type: Property_type_enum.Industrial,
            description: "A designated area containing multiple industrial properties."
        },
        {
            name: "Manufacturing Facility",
            type: Property_type_enum.Industrial,
            description: "A property designed for industrial production and manufacturing operations."
        },
        {
            name: "Cold Storage Facility",
            type: Property_type_enum.Industrial,
            description: "A temperature-controlled facility used to store perishable goods."
        },
        {
            name: "Workshop",
            type: Property_type_enum.Industrial,
            description: "A facility used for manufacturing, repair, or technical work."
        },

        // Special Purpose
        {
            name: "Public School",
            type: Property_type_enum.Special,
            description: "A property used to provide publicly funded education."
        },
        {
            name: "Government Building",
            type: Property_type_enum.Special,
            description: "A property used for government administration and public services."
        },
        {
            name: "Place of Worship",
            type: Property_type_enum.Special,
            description: "A building dedicated to religious services and community gatherings."
        },
        {
            name: "Cemetery",
            type: Property_type_enum.Special,
            description: "A designated area for the burial and memorialization of the deceased."
        },
        {
            name: "Public Hospital",
            type: Property_type_enum.Special,
            description: "A publicly operated facility providing healthcare and medical treatment."
        },
        {
            name: "Museum",
            type: Property_type_enum.Special,
            description: "A facility dedicated to preserving and displaying cultural or historical collections."
        },
        {
            name: "Library",
            type: Property_type_enum.Special,
            description: "A public facility providing access to books, information, and learning resources."
        },
        {
            name: "Community Center",
            type: Property_type_enum.Special,
            description: "A facility designed for community activities, events, and social services."
        },
        {
            name: "Fire Station",
            type: Property_type_enum.Special,
            description: "A facility used by emergency services to respond to fires and emergencies."
        }
    ];

    private async seedPropertyType() {
        try {
            const existingPropertyType = await this.prisma.property_type.findMany();

            if(existingPropertyType.length < 1) {
                const result = await Promise.allSettled(
                    this.property_Type_Seed.map(elem => this.prisma.property_type.create({data: elem}))
                );

                if(result.every(elem => elem.status == "fulfilled")) {
                    console.log("Property type seeded : ", result)
                    return {
                        status: true,
                        data: result.map(elem => elem.value)
                    }
                }
            }else if(existingPropertyType.length < this.property_Type_Seed.length) {
                const propertyTypeToCreate = this.property_Type_Seed.filter(
                    elem => !existingPropertyType.some(type => type.name == elem.name)
                );

                const result = await Promise.allSettled(
                    propertyTypeToCreate.map(elem => this.prisma.property_type.create({data: elem}))
                );

                if(result.every(elem => elem.status == "fulfilled")) {
                    console.log("Property type seeded : ", result)
                    return {
                        status: true,
                        data: existingPropertyType
                    }
                }
            }else{
                return {
                    status: true,
                    data: existingPropertyType
                }
            }
        }catch(error) {
            throw new BadRequestException(error)
        }
    }

    async seedPropertyCategory() {
        try {
            const propertyTypeList = await this.seedPropertyType();

            if(propertyTypeList) {
                const data = this.realEstateCategories.map(elem => ({
                    ...elem, 
                    typeId: propertyTypeList.data.find(type => type.name == elem.name)!.id}
                ))

                await this.prisma.property_category.createMany({data});
                console.log("Property categories : ", data);
            }  
        }catch(error) {
            throw new BadRequestException(error)
        }
    }

    async createProperty(data: {
        name: string,
        area: string,
        categoryId: string,
        municipalityId: string
    }): Promise<{status: boolean, data?: Property, error?: string}> {
        try {
            
            const [checkCategory, checkMunicipality] = await Promise.allSettled([
                this.prisma.property_category.findUnique({where: {id: data.categoryId}}),
                this.prisma.municipality.findUnique({where: {id: data.municipalityId}})
            ]);

            if(checkCategory.status == "fulfilled" && checkMunicipality.status == "fulfilled") {
                if(!checkCategory.value) {
                    return {
                        status: false,
                        error: "Category not found"
                    }
                }
                if(!checkMunicipality.value) {
                    return {
                        status: false,
                        error: "Municipality not found"
                    }
                }

                const result = await this.prisma.property.create({
                    data: {...data, status: Property_status.Available}
                })

                return {
                    status: true,
                    data: result
                }
            }else{
                throw new BadRequestException();
            }

        }catch(error) {
            throw new BadRequestException(error);
        }
    }

}
