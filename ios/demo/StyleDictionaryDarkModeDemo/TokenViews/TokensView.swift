//
//  TokensView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/19/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI

struct TokensView: View {
    var body: some View {
        NavigationView {
            List() {
                NavigationLink(destination: BackgroundColorView()) {
                    Text("Background Colors")
                }.listRowBackground(Color.backgroundPrimary)
            }.navigationBarTitle("Tokens")
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}
