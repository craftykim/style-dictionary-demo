//
//  ButtonsView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct PrimaryButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label

            .background(
                configuration.isPressed ? Color.backgroundInteractive : Color.backgroundInteractive)

            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct ButtonsView: View {
    var body: some View {
        VStack(spacing: 20) {
            Button("Primary") {
                print("Primary Button pressed")
            }.buttonStyle(PrimaryButton())
        }
        .navigationBarTitle("Buttons")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundInteractive)
        .edgesIgnoringSafeArea(.all)
    }
}
