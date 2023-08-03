'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export function loginauth() {
  const { data: session, status } = useSession({
    required: false,
  })
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  else if (status==="authenticated") {
    if (session.user.role==="tenant") {
      redirect("/tenant")
    }
    else if (session.user.role==="landlord"){
      redirect("/landlord")
    }
  }
}

export function rootauth() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  else if (status==="authenticated") {
    if (session.user.role==="tenant") {
      redirect("/tenant")
    }
    else if (session.user.role==="landlord"){
      redirect("/landlord")
    }
  }
}

export function tenantauth() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  else if (status==="authenticated") {
    if (session.user.role==="tenant") {
      //do nothing
    }
    else if (session.user.role==="landlord"){
      redirect("/landlord")
    }
  }
}

export function landlordauth() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  if (status === "loading") {
    return "Loading or not authenticated..."
  }
  else if (status==="authenticated") {
    if (session.user.role==="tenant") {
      redirect("/tenant")
    }
    else if (session.user.role==="landlord"){
      //do nothing
    }
  }
}