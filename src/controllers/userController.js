<<<<<<< HEAD
const supabase = require('../config/supabaseClient');

// POST - Register a new user
const { userRegistrationSchema } = require('../validators/userValidator');

// POST - Register a new user
exports.registerUser = async (req, res, next) => {
    try {
        // 1. The Bouncer: Validate the incoming data FIRST
        // We rename 'error' to 'validationError' so it doesn't conflict with Supabase later
        const { error: validationError, value } = userRegistrationSchema.validate(req.body);

        // 2. The Kick-Out: If validation fails, throw a 400 Bad Request
        if (validationError) {
            // Joi puts the specific error message inside an array called 'details'
            const err = new Error(validationError.details[0].message);
            err.statusCode = 400;
            return next(err); 
        }

        // 3. The VIP Lounge: Data is safe! Extract the validated values
        const { username, email } = value;

        // 4. Insert into Supabase
        const { data, error } = await supabase
            .from('profiles')
            .insert([{ username: username, email: email }])
            .select();

        if (error) {
            const err = new Error(error.message);
            err.statusCode = 400;
            return next(err);
        }

        res.status(201).json({
            status: "success",
            message: "User Registered in Supabase",
            data: data
        });

    } catch (error) {
        next(error);
    }
};

// GET - Retrieve users (handles optional role filtering)
exports.getUsers = async (req, res, next) => {
    try {
        const { role } = req.query;

        // 1. Start building the Supabase query
        let query = supabase.from('profiles').select('*');

        // 2. If the user passed a ?role=something query, filter the database
        if (role) {
            query = query.eq('role', role); // Assumes you have a 'role' column
        }

        // 3. Execute the query
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

        // 1. Query Supabase for a specific ID
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)   // Where id column matches req.params.id
            .single();      // Tells Supabase to return an object, not an array

        // 2. Handle if the user isn't found
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
=======
// POST - Register a new user
exports.registerUser = (req, res) => {
    res.status(201).json({
        status: "success",
        message: "User Registered"
    });
};

// GET - Retrieve users (handles optional role filtering)
exports.getUsers = (req, res) => {
    const { role } = req.query;

    if (role) {
        return res.status(200).json({
            status: "success",
            message: `Filtering users by role: ${role}`
        });
    }

    res.status(200).json({
        status: "success",
        data: []
    });
};

// GET - Retrieve a specific user by ID
exports.getUserById = (req, res, next) => {
    const { id } = req.params;

    // Simulate a "User Not Found" error for demo purposes
    if (id === "999") {
        const error = new Error("User not found in database");
        error.statusCode = 404;
        
        // In Express, when you throw an error inside a route, 
        // it automatically goes to the Error Handler.
        throw error; 
    }
    
    res.status(200).json({
        status: "success",
        message: `Fetching user with ID: ${id}`
    });
>>>>>>> 342deba376d74ffb5c5b560bcdb3040131e52dd0
};