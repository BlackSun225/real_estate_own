import bcrypt from "bcrypt";


export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

export async function checkPassword(
    password_to_check: string, 
    db_hashed_password: string
): Promise<boolean> {
    return await bcrypt.compare(password_to_check, db_hashed_password);
}