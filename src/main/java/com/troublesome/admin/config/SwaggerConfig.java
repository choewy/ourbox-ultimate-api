package com.troublesome.admin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {
  @Bean
  OpenAPI openAPI() {
    String jwt = "JWT";
    SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);
    Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
        .name(jwt)
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT"));

    return new OpenAPI()
        .components(new Components())
        .info(this.apiInfo())
        .addSecurityItem(securityRequirement)
        .components(components);
  }

  private Info apiInfo() {
    return new Info()
        .title("Troublesome Admin API")
        .description("Troublesome Admin API document")
        .version("1.0.0");
  }
}
