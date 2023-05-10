import type { InjectionKey } from 'vue'
import { RouteLocationNormalizedLoaded } from "vue-router"

export const routeMsg = Symbol() as InjectionKey<RouteLocationNormalizedLoaded>