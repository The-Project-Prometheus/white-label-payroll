import { useRouter } from 'vue-router'
import { AuthType } from '@/typings/auth.types.ts'
import { useAuthStore } from '@/stores/auth.store.ts'
import { watch, ref } from 'vue'

export const useSidebarNavLinks = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  type NavLink = {
    label: string
    icon: string
    name: string | undefined
  }

  type NavItem = {
    group: string
    links: NavLink[]
  }

  const navLinks = ref<NavItem[]>([])

  const handleRoutesVisibility = () => {
    navLinks.value = []
    router.getRoutes().forEach((route) => {
      if (route.meta.isSidebarMenu) {
        const navLink: NavLink = {
          name: route.name?.toString(),
          label: route.meta.label,
          icon: route.meta.icon || 'pi pi-circle',
        }
        const navLinkGroup = route.meta.group?.valueOf()

        // Filter routes that need to be authenticated
        if (route.meta.authType === AuthType.AUTHENTICATED && !authStore.isAuthenticated) return

        // Filter routes that need the user to NOT be authenticated
        if (route.meta.authType === AuthType.UNAUTHENTICATED && authStore.isAuthenticated) return

        // Filter routes that require roles
        if (route.meta.roles && authStore.isAuthenticated && !authStore.authHasRequiredRole(route.meta.roles)) return

        if (navLinkGroup) {
          const foundGroup = navLinks.value.find((n) => n.group === navLinkGroup)
          if (!foundGroup) {
            return navLinks.value.push({ group: navLinkGroup, links: [navLink] })
          }

          navLinks.value.forEach((n) => {
            if (n.group === navLinkGroup) {
              n.links.push(navLink)
            }
          })
        }
      }
    })
  }

  handleRoutesVisibility()

  // Refresh the navbar items everytime the user re-authenticates
  watch(
    () => authStore.authenticationToken,
    () => {
      handleRoutesVisibility()
    },
  )

  return { navLinks }
}
