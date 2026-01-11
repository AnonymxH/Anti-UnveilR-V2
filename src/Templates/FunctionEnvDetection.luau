return setfenv(function(RANDOM_VARIABLE_NAME_Env, ...)
    if game then return end

    return RANDOM_VARIABLE_NAME_Env.setfenv(function(...)
        SCRIPT_SOURCE()
    end, RANDOM_VARIABLE_NAME_Env)(...)
end, {})(getfenv(), ...)
