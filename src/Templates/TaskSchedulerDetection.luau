do
    local BindableEvent = Instance.new("BindableEvent")
    local SecretStatusCode

    task.defer(function()
        if SecretStatusCode then
            SecretStatusCode = 2
            BindableEvent:Fire()
        end
    end)

    SecretStatusCode = 1
    BindableEvent.Event:Wait()

    if SecretStatusCode ~= 2 then return end
end

SCRIPT_SOURCE()
