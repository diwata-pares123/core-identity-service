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
};