return setfenv(
    function(...)
        RANDOM_VARIABLE_NAME()
        RANDOM_VARIABLE_NAME = nil

        SCRIPT_SOURCE()
    end,
    setmetatable({
        RANDOM_VARIABLE_NAME = function() end,
    }, {
        __index = getfenv(),
    })
)(...)
