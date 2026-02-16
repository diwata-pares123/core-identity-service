const supabase = require('../config/supabaseClient');
const { userRegistrationSchema } = require('../validators/userValidator');

// POST - Register a new user
exports.registerUser = async (req, res, next) => {
    try {
        // 1. VALIDATION: Check the incoming data
        const { error: validationError, value } = userRegistrationSchema.validate(req.body);

        if (validationError) {
            const err = new Error(validationError.details[0].message);
            err.statusCode = 400;
            return next(err); 
        }

        const { username, email } = value;

        // 2. DATABASE: Insert into Supabase 'profiles' table
        const { data, error } = await supabase
            .from('profiles')
            .insert([{ username, email }])
            .select();

        if (error) {
            const err = new Error(error.message);
            err.statusCode = 400;
            return next(err);
        }

        // 3. RESPONSE: Send success back to client
        res.status(201).json({
            status: "success",
            message: "User Registered in Supabase",
            data: data
        });

    } catch (error) {
        next(error);
    }
};

// GET - Retrieve all users (with optional role filter)
exports.getUsers = async (req, res, next) => {
    try {
        const { role } = req.query;
        let query = supabase.from('profiles').select('*');

        if (role) {
            query = query.eq('role', role); 
        }

        const { data, error } = await query;

        if (error) {
            const err = new Error(error.message);
            err.statusCode = 400;
            return next(err);
        }

        res.status(200).json({
            status: "success",
            results: data.length,
            data: data
        });

    } catch (error) {
        next(error);
    }
};

// GET - Retrieve a specific user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            const err = new Error("User not found in database");
            err.statusCode = 404;
            return next(err);
        }
        
        res.status(200).json({
            status: "success",
            data: data
        });

    } catch (error) {
        next(error);
    }
};