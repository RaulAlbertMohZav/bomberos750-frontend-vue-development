<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon class="mx-1">mdi-lock</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Cambiar contraseña</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <button-tooltip-secure-password class="d-inline d-sm-inline d-md-none"/>
      <button-generate-secure-password
        class="d-inline d-sm-inline d-md-none"
        @PasswordGeneratedBinding="notifySecurePasswordGeneratedEvent"
      />
    </v-toolbar>
    <validation-observer ref="FormUpdatePassword" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Contrseña actual -->
            <current-password-field-input
              ref="CurrentPasswordField"
              rules="required"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Nueva contraseña -->
            <new-password-field
              ref="PasswordField"
              rules="required|ItMustBeAPasswordSecure|confirmPassword:@password_confirmation"
              vid="password"
              name-provider="Nueva contraseña"
              label="Nueva Contraseña"
              :can-generate-password="true"
              :password-generated="passwordGenerate"
              @PasswordGeneratedBinding="passwordGenerate = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Confirmar contraseña -->
            <confirm-password-field
              ref="PasswordConfirmationField"
              rules="required|confirmPassword:@password"
              vid="password_confirmation"
              name-provider="Contraseña confirmada"
              label="Confirmar contraseña"
              :password-generated="passwordGenerate"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            class="d-flex justify-center justify-sm-center justify-md-end"
          >
            <v-btn
              :loading="loadingButtonChangePassword"
              :disabled="disabledButtonChangePassword || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="changePassword"
            >
              <v-icon
                right
                dark
                class="mr-1"
              >
                mdi-content-save-settings
              </v-icon>
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>
<script src="./ChangePasswordComponent.js"></script>
