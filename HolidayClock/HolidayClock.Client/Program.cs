using BlazorAnimation;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.Configure<AnimationOptions>(Guid.NewGuid().ToString(), c => { });

await builder.Build().RunAsync();
