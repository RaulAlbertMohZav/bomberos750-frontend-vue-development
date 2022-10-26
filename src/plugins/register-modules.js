import { registerModules } from '@/helpers/register-modules'
import errors from '@/modules/errors/system'
import loading from '@/modules/loading'
/* import login from '@/modules/auth/login'
import profile from '@/modules/profile' */

registerModules({
  errors,
  loading/* ,
  login,
  profile */
})
