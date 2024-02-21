"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";

const ApolloProviderWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
