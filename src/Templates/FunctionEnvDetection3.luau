return setfenv(
    function(RANDOM_VARIABLE_NAME_Env, ...)
        RANDOM_VARIABLE_NAME()

        return RANDOM_VARIABLE_NAME_Env.setfenv(function(...)
            SCRIPT_SOURCE()
        end, RANDOM_VARIABLE_NAME_Env)(...)
    end,
    setmetatable({}, {
        __index = function(_, Key)
            if Key == RANDOM_VARIABLE_NAME then
                return function() end
            end
        end,
    })
)(getfenv(), ...)
