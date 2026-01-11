local RANDOM_VARIABLE_NAME_CanProceed = false
local RANDOM_VARIABLE_NAME_BindableFunction = Instance.new("BindableFunction")

function RANDOM_VARIABLE_NAME_BindableFunction.OnInvoke(RANDOM_VARIABLE_NAME_Num, ...)
    if RANDOM_VARIABLE_NAME_CanProceed then
        if RANDOM_VARIABLE_NAME_Num ~= 2 then return true end

        return (function(...)
            SCRIPT_SOURCE()
        end)(...)
    end
    RANDOM_VARIABLE_NAME_CanProceed = true
end

local Result = RANDOM_VARIABLE_NAME_BindableFunction:Invoke()
if Result then return Result end

return (function(...)
    RANDOM_VARIABLE_NAME_BindableFunction = RANDOM_VARIABLE_NAME_BindableFunction:Destroy()
    return ...
end)(RANDOM_VARIABLE_NAME_BindableFunction:Invoke(2, ...))
