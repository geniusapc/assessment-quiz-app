import "reflect-metadata";
import bcrypt from 'bcrypt';
import { db } from "@/config/data-source";
import { signAccessToken } from '@/utils/jwt';
import { User, UserRole } from '@/entities/User';
import { Role } from "@/entities/Role";

const SALT_ROUNDS = 10;
const userRepo = db.getRepository(User);
const roleRepository = db.getRepository(Role);

export const register = async (email: string, password: string, name: string) => {
    const existing = await userRepo.findOneBy({ email });
    if (existing) throw { status: 400, message: 'Email already in use' };
    const hash = await bcrypt.hash(password, SALT_ROUNDS);


    const roles = await roleRepository.find();
    const roleMap = new Map(roles.map(role => [role.name, role]));
    const role = roleMap.get(UserRole.USER);

    if (!role) {
        throw new Error("User role not found");
    }

    const user = userRepo.create({ email, password: hash, role, name });
    await userRepo.save(user);
    return getUserData(user);
};

export const login = async (email: string, password: string): Promise<{ user: Partial<User>, accessToken: string }> => {
    const user = await userRepo.findOneBy({ email });
    if (!user) throw { status: 401, message: 'Invalid credentials' };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, message: 'Invalid credentials' };

    const payload = { userId: user.id, email: user.email };
    const accessToken = await signAccessToken(payload);

    return { user: getUserData(user), accessToken };
};


// function to get consistent user data to avoid leaking sensitive information
const getUserData = (user: User) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name
    };
}


